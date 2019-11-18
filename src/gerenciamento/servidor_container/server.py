import iperf3

server = iperf3.Server()

print('[INFO] - Running server: ' + str(server.bind_address) + " " + str(server.port), flush=True)

while True:
    result = server.run()
    
    if result.error:
        print(result.error)
    else:
        print('ok')
        print('Test results from {0}:{1}'.format(result.remote_host, result.remote_port))
        print('  started at         {0}'.format(result.time), flush=True)