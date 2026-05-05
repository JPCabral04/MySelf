import { User } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import * as bcrypt from "bcrypt"

export class AuthRepository {

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email }
    })
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }

  async createUser(name: string, email: string, passwordHash: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(passwordHash, 10)
    return prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword
      }
    })
  }
}
