import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  describe('getUserById', () => {
    it('should return a user when a valid ID is provided', async () => {
      // Arrange
      const mockUserId = '23f1508b-1e1b-4f4d-b84b-17c781b0445f';
      const mockUser: User = new User();
      jest.spyOn(userService, 'findUserById').mockResolvedValue(mockUser);

      // Act
      const result = await userResolver.getUserById(mockUserId);

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw an error when user with the provided ID is not found', async () => {
      // Arrange
      const mockUserId = '123';
      jest.spyOn(userService, 'findUserById').mockResolvedValue(null);

      // Act and Assert
      await expect(userResolver.getUserById(mockUserId)).rejects.toThrowError(
        `User with ID ${mockUserId} not found`,
      );
    });

    it('should throw an error when an error occurs while fetching the user', async () => {
      // Arrange
      const mockUserId = '23f1508b-1e1b-4f4d-b84b-17c781b0445f';
      const errorMessage = 'Database connection error';
      jest.spyOn(userService, 'findUserById').mockRejectedValue(new Error(errorMessage));

      // Act and Assert
      await expect(userResolver.getUserById(mockUserId)).rejects.toThrowError(
        `Error fetching user: ${errorMessage}`,
      );
    });
  });
});
