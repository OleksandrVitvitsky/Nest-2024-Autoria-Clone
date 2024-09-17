import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ProfanityValidatorGuard implements CanActivate {
  private readonly forbiddenWords: string[] = [
    'tomato',
    'potato',
    'carrot',
    'banana',
    'orange',
    'pineapple',
    'apple',
  ]; // за бажанням можна змінити на реальну нецензурщину

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (body) {
      const title = body.title || '';
      const description = body.description || '';

      for (const word of this.forbiddenWords) {
        if (title.includes(word) || description.includes(word)) {
          throw new ForbiddenException(
            'The title or description contains forbidden words.',
          );
        }
      }
    }

    return true;
  }
}
