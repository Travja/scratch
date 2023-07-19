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
announcements = col.find({'announcement': False, 'announcementSent': False})

# Set up smtp information
smtp_server = os.getenv('SMTP_SERVER')
smtp_port = os.getenv('SMTP_PORT')
smtp_username = os.getenv('SMTP_USER')
smtp_password = os.getenv('SMTP_PASS')

emailBody = """
Dear {firstName} {lastName},

We are so excited that you want to celebrate with us and we look forward to seeing you on our special day! Attached, you'll find a copy of our invitation. Please let us know if you have any questions.

Thank you!
Travis & Dorothy
"""
front = None
back = None

with open('Announcement Front.jpg', 'rb') as fp:
    front = MIMEImage(fp.read())
with open('Announcement Back.jpg', 'rb') as fp:
    back = MIMEImage(fp.read())

context = ssl.create_default_context()
server = None

def sendEmail(email, body):
    print('Sending email to', email)
    print()

    # send the email
    message = MIMEMultipart()
    message["Subject"] = "Travis & Dorothy's Wedding Invitation"
    message["From"] = "Travis Eggett <" + smtp_username + ">"
    message["To"] = email
    try:
        message.attach(MIMEText(body, "plain"))
        # attach 'Announcement Front.jpg' and 'Announcement Back.jpg'
        message.attach(front)
        message.attach(back)
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
        # send the email to the person
        sendEmail(announcement['email'], emailBody.format(firstName=announcement['firstName'], lastName=announcement['lastName']))

        # update the record to set announcementSent to True
        col.update_one({'_id': announcement['_id']}, {'$set': {'announcementSent': True}})
finally:
    server.quit()
