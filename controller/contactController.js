const contactModule = require("../models/contactModels");
const sendEmail = require("../utils/mail")


exports.contact = async (req, res) => {
    try {
        const { name,email,phoneNo,companyName,message } = req.body

        // check all fields is present
        if (!email | !name | !phoneNo | !message) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            })
        }

        // seve contact data on database
        const contactData = await new contactModule({ name,email,phoneNo,companyName,message }).save()
        console.log(contactData)


        //send email by nodemailer

        let sub = "Thank You for Contacting CODEDEV"
        let msg = `
Dear ${name},

Thank you for reaching out to [Your Company Name]. We have received your message and appreciate you taking the time to contact us. Our team is reviewing your inquiry, and we will get back to you as soon as possible.

If you need immediate assistance, feel free to contact us at +91 8209751765 or +91 6367126474 or reply to this email.

We look forward to assisting you!

Best regards,
Priyank gupta
Founder
Codedev
+91 8209751765
+91 6367126474
codedevservices@gmail.com
https://www.codedevservices.com
        `
        let sendToClient = sendEmail(email, sub, msg )

        let msg_for_com = `
Contacting Codedev
Name: ${name},
Phone number: ${phoneNo},
Email: ${email},
Company name: ${companyName},
message: ${message}
        `
        let sendToTeam = sendEmail(process.env.TEAM_EMAIL, "Someone contact at website", msg_for_com )


        //check email send or not

        if (!sendToClient || !sendToTeam){
            console.log(`
            email send status
            cliant: ${sendToClient}
            team: ${sendToTeam}
                `)
        }

        return res.status(200).send({
            message: "message sended for contact us",
            success: true
        })


    }
    catch (err) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${err}\n)`)
        return res.status(500).send({
            message: "error in contact page",
            success: false,
            error: err,
        })
    }
}