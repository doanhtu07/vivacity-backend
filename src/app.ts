import cors from "cors";
import express, { Express } from "express";
import { corsOptions } from "./cors";
import { ErrorWrap } from "./utils/Error";
import { User } from "@prisma/client";
import { convertExpressUser } from "./utils/Types";
import * as http from "http";
import prisma from "./prisma/client";

export default class App {
  server: http.Server | null | undefined = null;
  app: Express | null | undefined = null;

  constructor() {
    this.app = express();

    this.app.use(cors(corsOptions));

    this.app.get("/awesome/applicant", (req, res) => {
      prisma.user
        .findUnique({
          where: { email: "doanhtu07@gmail.com" },
        })
        .then(function createUserIfNone(user) {
          if (!user) {
            return prisma.user.create({
              data: {
                email: "doanhtu07@gmail.com",
                metadata: JSON.stringify({
                  name: "Anh Tu Do",
                  major: "Computer Science",
                  class: "Junior",
                  school: "University of Texas at Dallas",
                  hobbies: [
                    "coding",
                    "singing",
                    "startup",
                    "system design",
                    "exercise",
                  ],
                }),
              },
            });
          }

          return user;
        })
        .then(function resolve(user) {
          res.send({
            user: convertExpressUser(user),
          });
        })
        .catch((err) => {
          console.error(ErrorWrap(err));
        });
    });

    this.app.get("/awesome/applicant/no-db", (req, res) => {
      const fakeUser: User = {
        id: BigInt(-1),
        email: "doanhtu07@gmail.com",
        metadata: JSON.stringify({
          name: "Anh Tu Do",
          major: "Computer Science",
          class: "Junior",
          school: "University of Texas at Dallas",
          hobbies: [
            "coding",
            "singing",
            "startup",
            "system design",
            "exercise",
          ],
        }),
      };

      res.send({
        user: convertExpressUser(fakeUser),
      });
    });

    // custom 404
    this.app.use((req, res) => {
      res.status(404).send({
        message: "Sorry can't find route!",
      });
    });
  }

  start(): http.Server | null | undefined {
    this.server = this.app?.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}.`);
    });
    return this.server;
  }

  stop(): void {
    this.server?.close();
  }
}
