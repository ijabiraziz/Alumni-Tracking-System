import pandas as pd
from rest_framework_simplejwt.tokens import RefreshToken

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



