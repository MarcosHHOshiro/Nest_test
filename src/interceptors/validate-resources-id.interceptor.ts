import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { VAlIDATE_RESOURCES_IDS_KEY } from 'src/consts';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ValidateResourcesIdInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Request>> {
    //Validar se o endpoint tem o decorator @ValidateResourcesIds
    const shouldValidate = this.reflector.get<boolean>(
      VAlIDATE_RESOURCES_IDS_KEY,
      context.getHandler(),
    );

    if (!shouldValidate) {
      return next.handle();
    }

    //Validar o projectId da Url
    const request = context.switchToHttp().getRequest();
    const projectId = request.params.projectId;

    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return next.handle();
  }
}
