# 🔍 No Hesi Solo Position Tracker
<img src="https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/MIT-green?style=for-the-badge" /> <img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/NexxonOfficial/nohesi-solo-checker/total?style=for-the-badge">


As the title states, a locally hosted website that you can utilise to see what your position is in the Top 500 (Certification) in regards to solo positioning. No Hesi (at the time I am writing this) doesn't have the utility to view where you stand if you are a solo player, since your position is purely based on the highest amount of points you have *overall*, team or no team. 

## 📦 Limitations

- Due to the script simply utilising the "No Hesi Public API", **you can only see where your solo position is on the leaderboard if your highest score is SOLO**. If you've got a higher score on the leaderboard as a proximity team, you will not show on this site. This is because it filters out all proxy scores to show only users that have contributed solo scores to the board.

- As of right now you can only search via Steam ID or Display Name that is on your No Hesi Account. If you'd like to see any other search options added feel free to let me know!

## 🧾 Screenshots
<img src="https://i.imgur.com/2zxDin5.png" width=400> <img src="https://i.imgur.com/bbY4JZH.png" width=400> <img src="https://i.imgur.com/dqTxLXW.png" width=400> <img src="https://i.imgur.com/WvL75n8.png" width=400> <img src="https://i.imgur.com/Fisnb0C.png" width=400>

## 💻 How To Download / Use The System
You have two options in how you can run this on your local machine, as per my recommendations. If you know other ways, feel free to use them.

1) Via Node.js + NPM. See their documentation on how to set it up, fairly easy as long as you put your mind to it. View the docs [here.](https://www.npmjs.com/package/http-server)

2) Via Python, probably the more complex out of the two but still an easy solution. [This tutorial](https://www.digitalocean.com/community/tutorials/python-simplehttpserver-http-server) shows how to do it, and is relatively easy. Just navigate to the folder where you installed the build files and select on the index.html file.

I did attempt to make it so you simply opened the index.html file and it worked like that, however CORS policy got in the way of the fetch request to No Hesi's API since it's executing via file://, therefore it simply isn't possible to do it that way. So, the two options above are likely your best bets if you want to run this.

Best of luck!

## ⚖️ Disclaimer
This project is an **unofficial fan-made tool** and is **not affiliated with, endorsed by, or in any way officially connected to No Hesi, its developers, or any of its official entities**.

**All trademarks, logos, and brand names used in this project, including the No Hesi logo, are the property of their respective owners**. The use of such materials is solely for identification and informational purposes and does not imply any endorsement or partnership.

If you are the owner of any content used in this project and wish to have it modified or removed, please feel free to open an issue or contact us directly.

Hope you enjoy! Get those solo runs in! 💪

## 📃 License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
