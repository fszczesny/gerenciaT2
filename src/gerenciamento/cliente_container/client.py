from array import *
import iperf3
import time
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import threading

# Cria e estabelece conexao
def startClient(ip, port, connectionDuration):
    client = iperf3.Client()
    client.duration = connectionDuration
    client.server_hostname = ip
    client.port = port
    print('[INFO] - Connecting to {0}:{1}'.format(client.server_hostname, client.port))
    result = client.run()
    return result

# Analisa conexao
def analiseConnection(result):
    # Dados no formato [taxa de transmissao, taxa de retransmissao, % de uso de cpu no dispositivo monitorado]
    data = []
    if result.error:
        return data
    else:
        print('')
        print('Test completed:')
        print('  bytes transmitted  {0}'.format(result.sent_bytes))
        print('  retransmits        {0}'.format(result.retransmits))
        print('  avg cpu load       {0}%'.format(result.local_cpu_total))
        print('  Transmitted data in Megabits per second  (Mbps)  {0}'.format(result.sent_Mbps))
        data.append(float(result.sent_Mbps))
        data.append(float((result.retransmits/result.sent_bytes)*100))
        data.append(float(result.local_cpu_total))
        return data

connectionResut = False
lock = threading.Lock()
ipDevice = ''
portDevice = 5201
connectionTime = 15
minNetworkBand = 1  # Valor em Mbps
maxNetworkLoss = 20 # Valor em porcentagem
maxDeviceCpu = 90   # Valor em porcentagem
networkBand = 0     # Valor em Mbps
networkLoss = 0     # Valor em porcentagem
deviceCpu = 0       # Valor em porcentagem
alertBand = False
alertLoss = False
alertCpu = False

def updateVariables():
    while (True):
        lock.acquire()
        global portDevice
        global ipDevice
        global connectionTime
        global networkBand
        global networkLoss
        global deviceCpu
        global minNetworkBand
        global maxNetworkLoss
        global maxDeviceCpu
        global alertBand
        global alertLoss
        global alertCpu

        retunedData = []

        if connectionResut is not False:
            returnedData = analiseConnection(connectionResut)
            if (len(retunedData) == 3)
                networkBand = retunedData[0]
                networkLoss = retunedData[1]
                deviceCpu = retunedData[2]
                if (networkBand < minNetworkBand)
                    alertBand = True
                else
                    alertBand = False
                if (networkLoss > maxNetworkLoss)
                    alertBand = True
                else
                    alertBand = False
                if (deviceCpu > maxDeviceCpu)
                    alertBand = True
                else
                    alertBand = False

        lock.release()
        time.sleep(5)

updateVariablesThread = threading.Thread(target=updateVariables)
updateVariablesThread.start()

app = Flask(__name__)

cors = CORS(app)

# Aqui tem que criar os apps routes
connectionResut = startClient(ipDevice, portDevice, connectionTime)

updateVariablesThread.join()