# build_files.sh
python3.9 -m pip install virtualenv
python3.9 -m venv env
./env/Bin/activate
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic