export interface IUsers {
  userOne: string;
}
export interface IAuth {
  signup: string;
}
export class Images {
  public static readonly mainLogo: string = './assets/images/logo/shopping-cart-logo.svg';
  public static readonly bannerLogo: string = './assets/images/authpage/login_supermarket.png';

  public static readonly auth: IAuth = {
    signup: './assets/images/authpage/signup_supermarket.jpeg',
  };

  public static readonly users: IUsers = {
    userOne: './assets/images/authpage/profile-image.png',
  };
}
