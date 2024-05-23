import * as Realm from "realm-web";

const app = new Realm.App({ id: "application-0-bmsezyg" });

const credentials = Realm.Credentials.anonymous();

async function getUser(): Promise<Realm.User> {
  const user = await app.logIn(credentials);
  return user;
}

export { app, getUser };
