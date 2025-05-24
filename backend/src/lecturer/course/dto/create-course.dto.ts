export class CreateCourseDto {
  categoryId: string;
  courseName: string;
  description?: string;
  imageUrl?: string;
  courseFee: string;
  instructors: {
    staffId?: string;
    staffName: string;
    role: string;
  }[];
}
