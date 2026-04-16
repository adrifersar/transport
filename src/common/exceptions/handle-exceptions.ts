import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

export const handleExceptions = (error: any) => {

    if (error.name === 'EntityNotFoundError') throw new NotFoundException(error.message)
    if (error.code === '23505') throw new ConflictException(error.message);
    if (error.code === '23503')
        throw new ConflictException('Foreign Key Restriction');

    throw new InternalServerErrorException(error.message);

}