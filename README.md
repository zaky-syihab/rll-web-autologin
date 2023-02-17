# How to Run

1. Clone this repo
2. Install the package using `yarn`
3. Run `yarn dev -u [your-email] -p [your-password] -l [login-url] -t [target-url]`.
4. For example `yarn dev -u rll.zaky.11@yopmail.com -p Test1234! -l https://dev.ralali.xyz/login -t http://m-rfq.ralali.loc:3000/tender`
5. Wait for the process
6. A browser with target page will appear, you can check the cookies and you will see that `access_token` and `refresh_token` is already there. Happy Coding!

# Arguments

- `-u` = username (e.g. rll.zaky.11@yopmail.com)
- `-p` = password (e.g. Test1234!)
- `-l` = login url (e.g. https://dev.ralali.xyz/login or https://ralali.com/login)
- `-t` = target url (e.g. http://m-rfq.ralali.loc:3000/tender)
- `-v` = verbose mode (e.g. `true` or `false`), `false` by default

# Troubleshooting

- If you want to see the full error messages, you can pass `-v true` to enable verbose mode
- Don't forget to use Ralali Internal Network or VPN if you use `dev` environment as `-l` or `-t` arguments

# Future Plan

- Enable extensions like React Dev Tools, Redux Dev Tools, BitWarden by default
- Support user profile usage (I think its possible for non arm64 devices for now)
- Directly hit login endpoint by fetching `grant_token` first and then call `login` api
