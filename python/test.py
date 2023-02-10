job_name = "native/osx"
build_id = "9999"
result_bundle_path="e2e_uitest_results"
log_path = "{}/{}".format(job_name, build_id)
password = "parola"
web_server_path = "/Library/WebServer/Documents/logs/{}".format(log_path)
cmd = "echo {} | sudo -S mkdir -p '{}'"
print (cmd.format(password, web_server_path))
cmd = "echo {} | sudo -S cp -Rf {} '{}'"
print (cmd.format(password, result_bundle_path, web_server_path))
