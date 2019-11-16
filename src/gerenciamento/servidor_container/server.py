# Executar com python 2.7
import iperf3

server = iperf3.Server()
print('[INFO] - Running server: {0}:{1}'.format(server.bind_address, server.port))

while True:
    result = server.run()

    if result.error:
        print(result.error)
    else:
        print('')
        print('Test results from {0}:{1}'.format(result.remote_host, result.remote_port))
        print('  started at         {0}'.format(result.time))