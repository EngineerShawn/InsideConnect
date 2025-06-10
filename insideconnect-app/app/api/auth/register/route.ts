// /* eslint-disable prettier/prettier */
// // insideconnect-app/app/api/auth/register/route.ts

// import { NextResponse } from "next/server";
// import knex from "knex";
// import bcrypt from "bcryptjs";

// import knexConfig from "../../../../backend/knexfile"; // Adjust path as needed

// // Initialize knex with the development configuration
// const db = knex(knexConfig.development);

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             streetAddress,
//             city,
//             state,
//             zipCode,
//             phoneNumber,
//         } = body;

//         // --- 1. Server-Side Validation ---
//         if (!firstName || !lastName || !email || !password) {
//             return NextResponse.json(
//                 { message: "Missing required fields." },
//                 { status: 400 },
//             );
//         }

//         // --- 2. Check if user already exists ---
//         const existingUser = await db("users").where({ email }).first();

//         if (existingUser) {
//             return NextResponse.json(
//                 { message: "Email is already in use." },
//                 { status: 409 }, // 409 Conflict
//             );
//         }

//         // --- 3. Hash the password ---
//         const salt = await bcrypt.genSalt(10);
//         const password_hash = await bcrypt.hash(password, salt);

//         // --- 4. Insert the new user into the database ---
//         const newUser = {
//             first_name: firstName,
//             last_name: lastName,
//             email,
//             password_hash,
//             street_address: streetAddress,
//             city,
//             state,
//             zip_code: zipCode,
//             phone_number: phoneNumber,
//             is_verified: false, // User is not verified by default
//         };

//         await db("users").insert(newUser);

//         // --- 5. Send Success Response ---
//         // In the next step, we will add email sending logic here.
//         return NextResponse.json(
//             {
//                 message:
//                     "Account registered successfully. Please check your email to verify your account.",
//             },
//             { status: 201 }, // 201 Created
//         );
//     } catch (error) {
//         console.error("Registration Error:", error);

//         return NextResponse.json(
//             { message: "An internal server error occurred." },
//             { status: 500 },
//         );
//     }
// }
