import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UserLoginService } from 'src/application/user_login.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly userLoginService: UserLoginService,
    ) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest() as any;
        const { authorization }: any = request.headers;
        
        if ((!authorization || authorization.trim() === '')) {
          throw new UnauthorizedException('Please provide token');
        }

        const user_logged = await this.userLoginService.checkUserIsLogged(authorization.split('Bearer ')[1]);
        console.log(user_logged[0])
        if(!user_logged[0]) {
            throw new UnauthorizedException('Please provide token');
        }


        return true
        // this.userLoginService.checkUserIsLogged()
        
      }
}
