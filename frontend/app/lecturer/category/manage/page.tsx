'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import PageContainer from '@/app/components/ui/PageContainer'
import SimpleTable, { TableRow } from '@/app/components/ui/SimpleTable'
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from '@/app/components/ui/Button'
import Toast from '@/app/components/ui/Toast'
import Modal from '@/app/components/ui/Modal'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import FormInput from '@/app/components/ui/FormInput'

type Category = {
  id: string
  name: string
  status: 'active' | 'inactive'
  createdBy: string
  updatedAt: string
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Information Technology',
    status: 'active',
    createdBy: 'Staff User',
    updatedAt: '2025-04-06 10:20',
  },
  {
    id: '2',
    name: 'Data Science',
    status: 'inactive',
    createdBy: 'Staff User',
    updatedAt: '2025-04-06 10:20',
  },
]

export default function ManageCategory() {
  const [categoryList, setCategoryList] = useState<Category[]>(initialCategories)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formError, setFormError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const modalRef = useRef<HTMLDialogElement | null>(null)

  const openCreateModal = () => {
    setFormName('')
    setEditingId(null)
    setFormError('')
    modalRef.current?.showModal()
  }

  const openEditModal = (category: Category) => {
    setFormName(category.name)
    setEditingId(category.id)
    setFormError('')
    modalRef.current?.showModal()
  }

  const toggleStatus = (id: string) => {
    setCategoryList((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              status: category.status === 'active' ? 'inactive' : 'active',
            }
          : category
      )
    )
    setToastMsg('Category status has been updated.')
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleSave = () => {
    if (!formName.trim()) {
      setFormError('Category name is required')
      return
    }

    if (editingId) {
      // Edit mode
      setCategoryList((prev) =>
        prev.map((cat) => (cat.id === editingId ? { ...cat, name: formName } : cat))
      )
      setToastMsg('Category updated successfully.')
    } else {
      // Create mode
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formName,
        status: 'active',
        createdBy: 'Staff User',
        updatedAt: new Date().toISOString(),
      }
      setCategoryList((prev) => [...prev, newCategory])
      setToastMsg('Category created successfully.')
    }

    setFormName('')
    setEditingId(null)
    modalRef.current?.close()
    setTimeout(() => setToastMsg(null), 3000)
  }

  const data: TableRow[] = categoryList.map((category) => ({
    categoryName: (
      <div className="text-sm">
        <div className="font-medium text-gray-900 dark:text-gray-100">{category.name}</div>
      </div>
    ),
    status: (
      <StatusToggleButton status={category.status} onClick={() => toggleStatus(category.id)} />
    ),
    action: (
      <div className="flex gap-2">
        <button onClick={() => openEditModal(category)}>
          <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
        </button>
        <button
          onClick={() => confirm(`Delete Category \"${category.name}\"?`) && alert('Deleted')}
        >
          <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
        </button>
      </div>
    ),
  }))

  return (
    <PageContainer title="Manage Category">
      {toastMsg && <Toast message={toastMsg} type="success" />}
      <div className="w-full">
        <div className="flex justify-end mb-5">
          <Button label="Create Category" variant="success" onClick={openCreateModal} />
        </div>

        <SimpleTable
          data={data}
          rowsPerPage={25}
          thead={
            <tr>
              <th className="w-6">#</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          }
        />
      </div>

      <Modal
        id="category_modal"
        title={editingId ? 'Edit Category' : 'Create Category'}
        ref={modalRef}
        size="sm"
        onClose={() => {
          setFormName('')
          setFormError('')
          setEditingId(null)
        }}
      >
        <div className="mb-4">
          <FormInput
            label="Category Name"
            id="categoryName"
            name="categoryName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
            error={formError}
          />
        </div>
        <div className="text-end mt-4 mb-4">
          <Button
            label={editingId ? 'Update' : 'Save'}
            variant="info"
            size="md"
            onClick={handleSave}
          />
        </div>
        <hr className="my-4 border-gray-200 dark:border-gray-700" />
      </Modal>
    </PageContainer>
  )
}
