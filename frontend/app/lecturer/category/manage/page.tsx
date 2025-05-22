'use client'

import React, { useEffect, useState, useRef } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { formatThaiDatetime } from '@/app/utils/date.util' // การแสดงวันที่
import { getUserIdFromToken } from '@/app/utils/auth.util' // นำเข้าฟังก์ชันดึง userId จาก token
import SimpleTable, { TableRow } from '@/app/components/ui/SimpleTable'
import PageContainer from '@/app/components/ui/PageContainer'
import Button from '@/app/components/ui/Button'
import Toast from '@/app/components/ui/Toast'
import Modal from '@/app/components/ui/Modal'
import StatusToggleButton from '@/app/components/ui/StatusToggleButton'
import FormInput from '@/app/components/ui/FormInput'
import ConfirmModal from '@/app/components/ui/ConfirmModal'

// ดึง userId ทันทีเมื่อต้นไฟล์
const userId = getUserIdFromToken()

// ประเภทข้อมูล Category
type Category = {
  id: number
  name: string
  isActive: boolean
  createdBy: number
  createdAt: string
  updatedAt: string | null
}

// ฟังก์ชันดึง token จาก localStorage
const getToken = () => {
  return localStorage.getItem('token')
}

// ดึงรายการ category ทั้งหมด
const fetchCategories = async (): Promise<Category[]> => {
  const token = getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Unauthorized: ${res.status}`)
  }

  return res.json()
}

// สร้างหมวดหมู่ใหม่
const createCategory = async (data: { name: string; createdBy: number }) => {
  const token = getToken()
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}

// อัปเดตชื่อ category
const updateCategory = async (id: number, data: { name: string; updatedBy: number }) => {
  const token = getToken()
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}

// เปลี่ยนสถานะเปิด/ปิด
const toggleCategoryStatus = async (id: number, data: { isActive: boolean; updatedBy: number }) => {
  const token = getToken()
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}

// ลบแบบ soft delete
const deleteCategory = async (id: number, deletedBy: number) => {
  const token = getToken()
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deletedBy }),
  })
}

export default function ManageCategory() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formError, setFormError] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const modalRef = useRef<HTMLDialogElement | null>(null)
  const confirmRef = useRef<HTMLDialogElement | null>(null)

  // โหลดข้อมูล และกรองเฉพาะ category ที่สร้างโดย userId ปัจจุบัน
  useEffect(() => {
    fetchCategories().then((categories) => {
      const filtered = categories.filter((c) => c.createdBy === userId)
      setCategoryList(filtered)
    })
  }, [])

  // เปิดฟอร์ม modal สำหรับสร้าง
  const openCreateModal = () => {
    setFormName('')
    setEditingId(null)
    setFormError('')
    modalRef.current?.showModal()
  }

  // เปิด modal สำหรับแก้ไข
  const openEditModal = (category: Category) => {
    setFormName(category.name)
    setEditingId(category.id)
    setFormError('')
    modalRef.current?.showModal()
  }

  // เปลี่ยนสถานะ active/inactive
  const toggleStatus = async (category: Category) => {
    await toggleCategoryStatus(category.id, {
      isActive: !category.isActive,
      updatedBy: userId!,
    })
    fetchCategories().then(setCategoryList)
    setToastMsg('Status updated')
    setTimeout(() => setToastMsg(null), 3000)
  }

  // บันทึก (ทั้งสร้างและแก้ไข)
  const handleSave = async () => {
    if (!formName.trim()) {
      setFormError('Category name is required')
      return
    }

    try {
      if (editingId !== null) {
        await updateCategory(editingId, {
          name: formName,
          updatedBy: userId!,
        })
        setToastMsg('Category updated.')
      } else {
        await createCategory({
          name: formName,
          createdBy: userId!,
        })
        setToastMsg('Category created.')
      }

      fetchCategories().then(setCategoryList)
      modalRef.current?.close()
      setFormName('')
      setEditingId(null)
      setFormError('')
      setTimeout(() => setToastMsg(null), 3000)
    } catch (err) {
      setFormError('Something went wrong.')
    }
  }

  // ยืนยันการลบ
  const handleConfirmDelete = async () => {
    if (!selectedCategory) return
    await deleteCategory(selectedCategory.id, userId!)
    fetchCategories().then(setCategoryList)
    setToastMsg('Category deleted')
    confirmRef.current?.close()
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category)
    confirmRef.current?.showModal()
  }

  // เตรียมข้อมูลให้ตาราง
  const data: TableRow[] = categoryList.map((category) => ({
    categoryName: (
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{category.name}</div>
    ),
    status: (
      <StatusToggleButton
        status={category.isActive ? 1 : 0}
        onClick={() => toggleStatus(category)}
      />
    ),
    updatedAt: (
      <div className="text-sm text-gray-500">
        {formatThaiDatetime(category.updatedAt ?? category.createdAt)}
      </div>
    ),
    action: (
      <div className="flex gap-2">
        <button onClick={() => openEditModal(category)}>
          <PencilSquareIcon className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
        </button>
        <button onClick={() => handleDeleteClick(category)}>
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
              <th className="min-w-[150px]">Status</th>
              <th>Update at</th>
              <th>Action</th>
            </tr>
          }
        />
      </div>

      {/* Modal: ฟอร์มสร้าง/แก้ไข */}
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
        <FormInput
          label="Category Name"
          id="categoryName"
          name="categoryName"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          required
          error={formError}
        />
        <div className="text-end mt-4 mb-4">
          <Button
            label={editingId ? 'Update' : 'Save'}
            variant="info"
            size="md"
            onClick={handleSave}
          />
        </div>
      </Modal>

      {/* Modal: ยืนยันลบ */}
      <ConfirmModal
        id="confirm_delete_category"
        ref={confirmRef}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => confirmRef.current?.close()}
        size="sm"
      />
    </PageContainer>
  )
}
