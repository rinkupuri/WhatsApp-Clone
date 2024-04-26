import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

const auth = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = new MongoClient(process.env.MONGO_URI || "");
      await client.connect();
      const db = client.db();
      const collection = db.collection("users");
      const hasedPassword = await hash("dsfg54df36gf6g6s35g56ddxf54g3d", 10);
      const result = await collection.findOne({ email: user.email });
      if (!result) {
        const newUser = await collection.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              name: user.name,
              email: user.email,
              password: hasedPassword,
            },
            $currentDate: {
              updateAt: true as any,
            },
            $setOnInsert: {
              createdAt: new Date(),
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
        const av = db.collection("Avatar");
        await av.insertOne({
          userId: newUser?._id,
          url: user.image,
        });
      }
      client.close();
      return true;
    },
  },
});

export default auth;
