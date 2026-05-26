# OpenVPN Setup

How this machine was configured to auto-connect to a personal OpenVPN tunnel on boot, with a `vpn` shell helper for manual control.

The config file used here lives next to this README as `vpnconfig.ovpn`.

---

## 1. Prerequisites

```
sudo pacman -S openvpn
```

## 2. Install the config as a systemd-managed client

The systemd template `openvpn-client@NAME.service` reads from `/etc/openvpn/client/NAME.conf`. So the filename (minus `.conf`) is the service instance name. Here we use `vpnconfig`.

```
sudo cp ~/vpnconfig.ovpn /etc/openvpn/client/vpnconfig.conf
sudo chown root:root /etc/openvpn/client/vpnconfig.conf
sudo chmod 600 /etc/openvpn/client/vpnconfig.conf
```

## 3. Enable and start

```
sudo systemctl enable --now openvpn-client@vpnconfig
```

`enable --now` does two things: starts it immediately, and makes it auto-start at boot.

Verify:

```
systemctl status openvpn-client@vpnconfig --no-pager
ip -brief addr show tun0
```

You should see `active (running)` and a `tun0` interface with a tunnel IP.

## 4. Add the `vpn` shell helper

Append this function to `~/.config/aliases` (which is sourced by `~/.bashrc`):

```bash
vpn() {
  local svc=openvpn-client@vpnconfig
  case "$1" in
    up)     sudo systemctl start "$svc" ;;
    down)   sudo systemctl stop "$svc" ;;
    status) systemctl status "$svc" --no-pager ;;
    logs)   sudo journalctl -u "$svc" -f ;;
    toggle) systemctl is-active --quiet "$svc" && sudo systemctl stop "$svc" || sudo systemctl start "$svc" ;;
    *)      echo "usage: vpn {up|down|status|logs|toggle}" ;;
  esac
}
```

Reload the shell:

```
source ~/.bashrc
```

---

## Usage

| Command       | What it does                                     |
| ------------- | ------------------------------------------------ |
| `vpn up`      | Connect                                          |
| `vpn down`    | Disconnect                                       |
| `vpn status`  | Show current state                               |
| `vpn toggle`  | Flip on/off based on current state               |
| `vpn logs`    | Tail live logs (Ctrl-C to exit)                  |

## Disabling auto-connect at boot

If you don't want it to come up automatically on every boot:

```
sudo systemctl disable openvpn-client@vpnconfig
```

Re-enable later with `sudo systemctl enable openvpn-client@vpnconfig`.

## Removing the setup entirely

```
sudo systemctl disable --now openvpn-client@vpnconfig
sudo rm /etc/openvpn/client/vpnconfig.conf
```

Then remove the `vpn()` function from `~/.config/aliases`.

## Troubleshooting

- **Service fails to start** — check `sudo journalctl -u openvpn-client@vpnconfig -n 50`. Common cause: the `.ovpn` references external files (`ca`, `cert`, `key`, `tls-auth`) by relative path that don't resolve under `/etc/openvpn/client/`. Either inline them into the config or copy them alongside and adjust paths.
- **Asks for username/password** — if the config has `auth-user-pass`, systemd can't prompt interactively. Replace it with `auth-user-pass /etc/openvpn/client/vpnconfig.creds` where that file contains two lines (username, password) and is `chmod 600 root:root`.
- **DNS not switching** — install `openvpn-update-systemd-resolved` and add the matching `up`/`down` lines to the config, or use the `update-resolv-conf` script.
