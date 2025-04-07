import { Page } from "@playwright/test";

/**
* ログインユーザーのページオブジェクトクラス
* @class loginUser
* @description ログインユーザーのページオブジェクトクラス
*/
export class loginUser {
  constructor(private page: Page) {}

  /**
   * ログイン処理を行うメソッド
   * @method login
   * @description ログイン処理を行うメソッド
   */
  async login() {
    await this.page.goto('http://localhost:3000/login');

    await this.page.getByRole('textbox', { name: 'メールアドレス' }).click();
    await this.page.getByRole('textbox', { name: 'メールアドレス' }).fill('test_chef@test.com');
    await this.page.getByRole('textbox', { name: 'パスワード' }).click();
    await this.page.getByRole('textbox', { name: 'パスワード' }).fill('1234567890');

    await this.page.getByRole('button', { name: 'ログイン' }).click();
  }
}