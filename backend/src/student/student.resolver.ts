import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/create.student';
import { UpdateStudentInput } from './dto/update.student';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student], { name: 'students' })
  async findAllStudents(): Promise<Student[]> {
    return this.studentService.findAllStudents();
  }

  @Query(() => Student, { name: 'student' })
  async findStudentById(@Args('id', { type: () => ID }) id: string): Promise<Student> {
    return this.studentService.findStudentById(id);
  }

  @Mutation(() => Student, { name: 'createStudent' })
  async createStudent(@Args('input') input: CreateStudentInput): Promise<Student> {
    return this.studentService.createStudent(input);
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  async updateStudent(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateStudentInput,
  ): Promise<Student> {
    return this.studentService.updateStudent(id, input);
  }

  @Mutation(() => Student, { name: 'deleteStudent' })
  async deleteStudent(@Args('id', { type: () => ID }) id: string): Promise<Student> {
    return this.studentService.deleteStudent(id);
  }
}
