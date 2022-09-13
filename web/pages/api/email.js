// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SMTPClient } from 'emailjs';


export default async function handler(req, res) {
    const { email, name, address1, address2, city, state, postal, country, own, mint } = req.body;
    const client = new SMTPClient({
        user: process.env.NEXT_PUBLIC_EMAIL,
        password: process.env.NEXT_PUBLIC_PASSWORD,
        host: process.env.NEXT_PUBLIC_SMTP,
        //port: process.env.NEXT_PUBLIC_PORT, //It made an bad request error 
        ssl: true
    });
    //res.status(200).end(JSON.stringify({ message: 'Send Mail', name: name, email: email, shipping: shipping }))
    try {
        //    client.send(
        //      {
        //        text: `Just for testing purpose`,
        //        from: process.env.mail,
        //        to: email,
        //        subject: 'testing emailjs',

        //      }
        //      )
        const message = await client.sendAsync({
            text: `
            Name: ${name} \r\n Email: ${email} \r\n Shipping Address: ${address1} ${address2}, ${city}, ${state}, ${postal}, ${country} \r\n
                   `,
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            subject: 'Order Request'
            ,
        });
    }
    catch (e) {
        res.status(400).end(JSON.stringify({ message: e }))
        return;
    }

    res.status(200).end(JSON.stringify({ message: 'Send Mail' }))
}