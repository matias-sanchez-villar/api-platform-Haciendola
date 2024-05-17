import request from "supertest";
import App from "../src/app";

describe("Testeo de rutas", () => {
  let app: any;
  let server: any;
  let authToken: string;

  beforeAll(async () => {
    app = new App();
    server = app.listen();

    const loginData = {
      email: "pepeq@gmail.com",
      password: "deidnineaidass",
    };

    const resLogin = await request(server).post("/user/login").send(loginData);

    if (resLogin.status !== 200) {
      throw new Error(`Error al iniciar sesión: ${resLogin.text}`);
    }

    authToken = resLogin.body.token;
  });

  afterAll(async () => {
    server.close(); 
  });

  it("Debería iniciar sesión correctamente en la ruta /login", async () => {
    const userData = {
      email: "pepeq@gmail.com",
      password: "deidnineaidass",
    };

    const res = await request(server).post("/user/login").send(userData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
  });

  it("Debería crear un nuevo usuario correctamente en la ruta /user/new", async () => {
    const newUserData = {
      firstName: "matias",
      lastName: "sanchez villar",
      dateOfBirth: "09/02/1996",
      phone: "291503345",
      email: "pepeqs@gmail.com",
      password: "232sadSS213312",
    };

    const res = await request(server)
      .post("/user/new")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newUserData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
  });

  it("Debería obtener todos los productos correctamente en la ruta /product/all", async () => {
    const res = await request(server)
      .get("/product/all")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

});
