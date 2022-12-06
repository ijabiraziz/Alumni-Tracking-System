import socket
 
HOST = 'localhost'
PORT = 64000
list_learningOutcome = ["1. Evaluate and apply design patterns in the design and development of a distributed system.","2. Assess and apply different architectural patterns in a distributed system.","3. Critically access and apply threading in a distributed application.","4. Debug a distributed client/server application, identifying object properties and variables at run-time.","5. Create a distributed object application using RMI, allowing client/server to communicate securely via interfaces and objects."]
 
def AddToLearningOutcome(item):
    list_learningOutcome.append(item)
    return list_learningOutcome
 
def Edit(index, value):
    r = list_learningOutcome.pop(index)
    list_learningOutcome.insert(index, value)
    return list_learningOutcome
 
def Delete(index):
    list_learningOutcome.pop(index)
    return list_learningOutcome
 
def RetriveLearningOutcome():
    str = ""
    for item in list_learningOutcome:
        str += item +"\n"
    return str
 
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sock.bind((HOST, PORT))
    sock.listen()
    conn, addr = sock.accept()
    with conn:
        print('Connected from: ', addr)
 
        while True:
            data = conn.recv(1024)
            if not data:
                break
            print("Received: " + data.decode())
            data_to_send = '(L)earning Outcomes, (C)ourses, (A)ssessments or (E)xit?'
            conn.sendall(data_to_send.encode())
 
            getInput = conn.recv(1024).decode()
            if getInput == "L":
                option = RetriveLearningOutcome()
                option += "\n\n(A)dd, (E)dit, (D)elete or (R)eturn?"
                conn.send(option.encode())
 
                option_A = conn.recv(1023).decode()
                print(option_A)
                if conn.recv(1024).decode() == "A":
                    print("Hello world")
                    promt = "Enter new LO description:"
                    conn.send(promt.encode())
                    description = conn.recv(1024).decode()
                    AddToLearningOutcome(description)
 
                    conn.send(RetriveLearningOutcome().encode())
 
                elif conn.recv(1024).decode()== "E":
                    promt = "Enter LO #: "
                    conn.send(promt.encode())
                    line_number = conn.recv(1024).decode()
                    description = "Enter new text: "
                    conn.send(description.encode())
 
                    d = conn.recv(1024).decode()
                    Edit(int(line_number)-1,d)
                    conn.send(RetriveLearningOutcome().encode())
 
            elif getInput == "C":
                option = "Courses"
 
            elif getInput == "A":
                option = "Assessments"
 
            elif getInput == "E":
                option = "Exit"
                break
 
            else:
                option = "Invalid"
 
            conn.send(option.encode())
 