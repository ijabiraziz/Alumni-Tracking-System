import socket
 
HOST = 'localhost'
PORT = 64000
 
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sock.connect((HOST, PORT))
    while True:
        response = input("What is the module id? ")
        if response == 'SOFT8023' or 'soft8023':
            sock.send(response.encode())
            r1 = sock.recv(1024)
            print(r1.decode())
 
            userinput1 = input()
            sock.send(userinput1.encode())
 
        data = sock.recv(1024)
        print(data.decode())
        userinput2 = input()
        if userinput2 == "L":
           sock.send(userinput2.encode())
           promt =sock.recv(1024)
           print(promt.decode())
 
           userinput3 = input()
           print(userinput3)
           sock.send(userinput3.encode())
 
           if userinput3 == "A":
               retrive = sock.recv(1024)
               print("Updated Learning Outcomes: \n",retrive.decode())
 
           elif userinput3 == "E":
               sock.send(userinput3.encode())
               edit = sock.recv(1024).decode()
               print(edit)
               lineNumber = input()
               sock.send(lineNumber.encode())
               des = sock.recv(1024).decode()
               print(des)
               desc = input()
               sock.send(desc.encode())
               newList = sock.recv(1024).decode()
               print(f"Updated Learning Outcomes:,{newList}")