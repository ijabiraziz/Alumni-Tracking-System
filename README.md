# Alumni-Tracking-System
An online platform built with Django and Django REST Framework to help educational institutions connect with their alumni community.

# Features
- User Registration and Authentication: Alumni can easily register and login to the system.
- Alumni Profile Management: Alumni can create and update their profiles, including personal and professional information.
- Event Management: Institutions can create and manage alumni events, such as reunions, networking sessions, and workshops.
- News and Updates: Institutions can share news, updates, and announcements with the alumni community.
- Mentorship Program: Alumni can sign up as mentors to guide and support current students and recent graduates.
- Job Board: Alumni can post job opportunities and internships, while current students and graduates can apply for them.
- Alumni Directory: A searchable directory of all registered alumni, allowing users to connect with each other based on various criteria such as location, industry, or alma mater.
- Donation Management: Alumni can make donations to support their alma mater's initiatives and scholarships.

# Technologies Used
- Backend: Django, Django REST Framework
- Frontend: React.js, HTML, CSS, JavaScript
- Database: PostgreSQL
- Authentication: JWT (JSON Web Tokens)
- Deployment: Docker, Nginx, Gunicorn

# Installation [Backend]
Clone the repository:
git clone https://github.com/your-username/Alumni-Tracking-System.git](https://github.com/ijabiraziz/Alumni-Tracking-System.git)

Create a virtual environment and activate it:
python -m venv env
source env/bin/activate

Install the required dependencies:
pip install -r requirements.txt

Set up the database:
python manage.py makemigrations
python manage.py migrate

Start the development server:
python manage.py runserver
Access the application at http://localhost:8000

Contributing
We welcome contributions from the community! If you find any issues or have suggestions for improvements, please feel free to create a new issue or submit a pull request.
License
This project is licensed under the MIT License.
