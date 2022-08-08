import json

def build_json(crash_id, version, tracking_id, uuid, org_id, crash_type, crash_time):
    json_report = {
        "appname": "Crash serversr",
        "userId": uuid,
        "extras": {
            "value": {
                "stacktrace": "",
                "dumpAvailable": "false",
                "expanded_stacktrace":"",
                "crashFile": "Unknown",
                "process": crash_type,
                "appArch": "",
                "crashInstanceTrackingId": tracking_id,
                "crashId": crash_id
            },
            "key": "Crash"
        },
        "orgId": org_id,
        "crashTime": crash_time,
        "uaType": "mac",
        "uaVersion": version
    }
    return json_report

def get_all_crashes(ids):
    crashes = {}
    for id in ids:
        crash_id = "crash"+id
        version = "ver"+id
        tracking_id = "track"+id
        uuid = "uuid"+id
        org_id = "org"+id
        crash_type = "crashType"+id
        json_event = build_json(crash_id, version, tracking_id, uuid, org_id, crash_type, "10/02/1966 20:00:12")
        if crash_id in crashes:
            print("Print ignoring crash as it's already in the dictionary")
        else:
            crashes[crash_id] = json_event
            print("Adding {} to dictionary".format(crash_id))
    return crashes


def print_crashes(json_events):
    for json_event in json_events.iteritems():
        print(json.dumps(json_event))
    

crashes = get_all_crashes(('1','2','3','1','3','5'))
print_crashes(crashes)