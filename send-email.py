import os
import pymongo
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from dotenv import load_dotenv

load_dotenv()

# connect to the database
connstr = os.getenv('DB_URL')
client = pymongo.MongoClient(connstr)
db = client.test
col = db.announcements
announcements = col.find({})

# Set up smtp information
smtp_server = os.getenv('SMTP_SERVER')
smtp_port = os.getenv('SMTP_PORT')
smtp_username = os.getenv('SMTP_USER')
smtp_password = os.getenv('SMTP_PASS')

emailBody = """
Dear {firstName} {lastName},

Thank you for being involved in whatever capacity you may have been for our wedding. Our wedding turned out to be a wonderful day and we are so happy to be married. We are so grateful for all of the love and support we have received from our family and friends. We are so blessed to have you in our lives.

If you missed the event or would like to relive the day, pictures are available at https://stellarmelodies.com/gallery. Additionally, if you took pictures but didn't get a chance to upload them yourself, we would love to see them! Your experience of the day is unique and we would love to see it through your eyes. You can upload them at https://stellarmelodies.com/upload.

Thanks again! We couldn't do it without you!

Love,
- The Eggetts
"""

context = ssl.create_default_context()
server = None

def sendEmail(email, body):
    print('Sending email to', email)
    print()

    # send the email
    message = MIMEMultipart()
    message["Subject"] = "Thank You! - Travis and Dorothy Eggett"
    message["From"] = "Eggetts <" + smtp_username + ">"
    message["To"] = email
    try:
        message.attach(MIMEText(body, "plain"))
        server.sendmail(smtp_username, email, message.as_string())
    except Exception as e:
        print(e)

try:
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.ehlo() # Can be omitted
    server.starttls(context=context) # Secure the connection
    server.ehlo() # Can be omitted
    server.login(smtp_username, smtp_password)

    for announcement in announcements:
        if (not 'email' in announcement or announcement['email'] == ''):
            continue
        # send the email to the person
        sendEmail(announcement['email'], emailBody.format(firstName=announcement['firstName'], lastName=announcement['lastName']))
        # update the record to set announcementSent to True
#         col.update_one({'_id': announcement['_id']}, {'$set': {'announcementSent': True}})
finally:
    server.quit()
