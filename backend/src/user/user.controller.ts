import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /user/instructors
  @UseGuards(AuthGuard('jwt'))
  @Get('instructors')
  async getInstructors(@Req() req: AuthenticatedRequest) {
    const { divisionId, userId } = req.user;
    return this.usersService.findInstructorsByDivision(divisionId, userId); // ส่ง userId ไปกรองออก
  }
}
