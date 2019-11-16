from array import *
import iperf3
import time
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import threading

client = iperf3.Client()
client.duration = 15
client.server_hostname = '192.168.0.109'
client.port = 5201

print('[INFO] - Connecting to {0}:{1}'.format(client.server_hostname, client.port))
result = client.run()

if result.error:
    print(result.error)
else:
    print('')
    print('Test completed:')
    print('  started at         {0}'.format(result.time))
    print('  bytes transmitted  {0}'.format(result.sent_bytes))
    print('  retransmits        {0}'.format(result.retransmits))
    print('  avg cpu load       {0}%\n'.format(result.local_cpu_total))

    print('Average transmitted data in all sorts of networky formats:')
    print('  bits per second      (bps)   {0}'.format(result.sent_bps))
    print('  Kilobits per second  (kbps)  {0}'.format(result.sent_kbps))
    print('  Megabits per second  (Mbps)  {0}'.format(result.sent_Mbps))
    print('  KiloBytes per second (kB/s)  {0}'.format(result.sent_kB_s))
    print('  MegaBytes per second (MB/s)  {0}'.format(result.sent_MB_s))