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
        data.append(float(result.retransmits/result.sent_bytes))
        data.append(float(result.local_cpu_total))
        return data

ipDevice = '192.168.0.109'
portDevice = 5201
connectionTime = 15
retunedData = []
connectionResut = startClient(ipDevice, portDevice, connectionTime)
returnedData = analiseConnection(connectionResut)