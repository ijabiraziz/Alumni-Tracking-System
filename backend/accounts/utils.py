import pandas as pd
from rest_framework_simplejwt.tokens import RefreshToken
import random
import string
import hashlib
import uuid

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    


def xlxs_to_list_dict(file_path):    
    df = pd.read_excel(file_path)
    d=df.T.to_dict().values()
    alumni_list=list(d)
    return alumni_list

def get_random_string():
    # With combination of lower and upper case
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(30))
    # print random string
    print(result_str)



def generate_hash():
    data = str(uuid.uuid4())
    return hashlib.sha256(data.encode('utf-8')).hexdigest()
    