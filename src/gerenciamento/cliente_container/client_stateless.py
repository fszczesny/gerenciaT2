from array import *
import iperf3
import time
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import os

# Cria e estabelece conexao
def startClient(connectionDuration):
    client = iperf3.Client()
    client.duration = connectionDuration
    client.server_hostname = os.getenv('SERVER_IP')
    client.port = 5201
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
        print('  Transmitted data in Megabits per second  (Mbps)  {0}'.format(result.sent_Mbps), flush=True)
        data.append(float(result.sent_Mbps))
        data.append(float((result.retransmits/result.sent_bytes)*100))
        data.append(float(result.local_cpu_total))
        return data

app = Flask(__name__)

cors = CORS(app)

@app.route("/data", methods=['GET'])
@cross_origin(origin='0.0.0.0')
def sendData():


    req_data = request.get_json()

    connectionTime = int(req_data['time'])

    minNetworkBand = float(req_data['minNetworkBand'])
    maxNetworkLoss = float(req_data['maxNetworkLoss'])
    maxDeviceCpu = float(req_data['maxDeviceCpu'])

    networkBand = 0     # Valor em Mbps
    networkLoss = 0     # Valor em porcentagem
    deviceCpu = 0       # Valor em porcentagem
    alertBand = False
    alertLoss = False
    alertCpu = False

    connectionResut = startClient(connectionTime)

    if connectionResut is not False:
        returnedData = analiseConnection(connectionResut)
        if (len(returnedData) == 3):
            networkBand = returnedData[0]
            networkLoss = returnedData[1]
            deviceCpu = returnedData[2]
        if (networkBand < minNetworkBand):
            alertBand = True
        else:
            alertBand = False
        if (networkLoss > maxNetworkLoss):
            alertBand = True
        else:
            alertBand = False
        if (deviceCpu > maxDeviceCpu):
            alertBand = True
        else:
            alertBand = False

    return {'network-band':  networkBand, 'network-loss': networkLoss, 'device-cpu': deviceCpu, 'alert-band': alertBand, "alert-loss": alertLoss, 'alert-cpu' :  alertCpu }

app.run(host='0.0.0.0', port='5005')