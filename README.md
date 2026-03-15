# React + TypeScript + Vite

```bash
这是 token-standard/transfers 接口的 CURL 测试命令

curl 'https://workers.alldefi.finance/api/v2/validator/wallet/token-standard/transfers' \
  -H 'accept: application/json, */*;q=0.8' \
  -H 'accept-language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNR2VkUVQySE50dUFOSnZKNnRidUItTm83V3FtTlVGblVQYWhwVnliQ0ZrIn0.eyJleHAiOjE3NzM1NzIzMzcsImlhdCI6MTc3MzU3MjAzNywiYXV0aF90aW1lIjoxNzczNTU3OTUxLCJqdGkiOiJvZnJ0cnQ6NjU2MGYxZDMtMDYyNy1iM2I2LWQxMjctZGRlYzcxNzU2MTkzIiwiaXNzIjoiaHR0cHM6Ly9pYW0udmFsaWRhdG9yLmRldi5weXRoYWdvcmFzLm9ic2lkaWFuLnN5c3RlbXMvY2xvYWsvcmVhbG1zL2NhbnRvbi12YWxpZGF0b3ItMSIsImF1ZCI6Imh0dHBzOi8vY2FudG9uLm5ldHdvcmsuZ2xvYmFsIiwic3ViIjoiZTczZTFlOGItYjE0Yi00ZTM0LWI0YjMtZWExMDllMTBlMmM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2FsbGV0LXVpIiwic2lkIjoiM2Y3NTUzZjAtZTAxNy0wY2EyLWQ5ODgtMDljYjFkMDBiMDgwIiwic2NvcGUiOiJvcGVuaWQgb2ZmbGluZV9hY2Nlc3MgdmFsaWRhdG9yX2FwaSJ9.naVfQopNJhZltMpkFpoSmVv8cRvp0sxXaTAoO1zmf0pjv5yrwGK1zh0vRrQYKuSaokrpM2bHp7ETkYdbxafOf6h7Ie6A-icHhlEMdQSad_x_z0vjRfL2esHdDlGYHO1jzxAJ0iQwiX3Vn4bKNEEqfLRnFqDvUTAM94Nv7DI17__aU0fnUPV7M6L2L3H0r2ltGKgivNwvN6xtPkWj1k87PVrrhbH5UF0wbD4o4apA5vkvAjXzUITwKaADakmgOcDrR9y3spBVRicGCwi90L4op57jLws0GLpwWYzpD3nHNuNeZWpqxa77Uv1QHRuTLpwN0hrzxFOyiEys3338-Hf60w' \
  -H 'content-type: application/json' \
  -H 'origin: https://wallet.validator.dev.pythagoras.obsidian.systems' \
  -H 'priority: u=1, i' \
  -H 'referer: https://wallet.validator.dev.pythagoras.obsidian.systems/transfer' \
  -H 'sec-ch-ua: "Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'traceparent: 00-858d31cc0c1e7840fe2ba1522558e12a-814dc397143db98f-01' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36' \
  --data-raw '{"receiver_party_id":"al1510-3::1220d6c093d5c0112904b831b8d5a83c907050bd1ab551193b813388b7f581b29129","amount":"1.0","description":"测试","expires_at":1773658493543000,"tracking_id":"f8cb8e8f-41ec-4973-bc3f-2153898b83de"}'

这是 token-standard/transfers 接口返回的内容。
{
    "output": {
        "receiver_holding_cids": [
            "004da454085a9b93f5d09d8e09dd18b2570e1360b241c6f91b313919a0d01030dcca1212203cfe32a6deb0cb60d7cd35b38373fabb2ea991fb2911daeae345af21e966e0f4"
        ]
    },
    "sender_change_cids": [
        "004eabd160a5f69d7b06e5e358c15ea0f350b635017c4d0b5d6eeec1f07024d984ca12122015f1b7c6007f73366516008326124d1e7f34f76a34adb4a453e4696624a33e4f"
    ],
    "meta": {}
}

请根据 CURL 命令和返回内容，构建 token-standard/transfers 的测试面板。
```
