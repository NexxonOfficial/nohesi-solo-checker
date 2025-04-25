<script lang="ts">
  import { onMount } from "svelte";
  import logoBlack from '/NoHesiMinimal-Black.svg'
  import logoGrey from '/NoHesiMinimal-Grey.svg'
  import collapseIcon from '/Collapse.svg'

  interface ProxyMember {
      steamId: string,
      name: string,
      website_name: string,
      avatar_url: string
  }

  interface Team {
      members: ProxyMember[]
  }

  interface PositionMember {
      score: number,
      steamid: string,
      input: string,
      combo: string,
      avg_speed: string,
      run_time: string,
      run_distance: string,
      car_model: string,
      server: string,
      map: string,
      lives_left: number,
      team: Team,
      prox_time: number,
      prox_combo: number,
      cars_passed: number,
      traffic_type: string,
      avatar: string,
      avatarfull: string,
      personaname: string,
      label: string,
      server_title: string
  }

  let playerList: PositionMember[];
  let filteredPlayers: PositionMember[] = [];
  let iterator = 1;
  let steamIdEntered = "";
  let singlePositionShow: PositionMember | undefined;
  let maxHeightCache: string = '200px'

  onMount(() => {
      fetch('https://api.nohesi.gg/leaderboard?page=1&pageSize=500', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then((res) => res.json().then((data) => {
          playerList = data.players as PositionMember[];

          for(let i=0; i < playerList.length; i++) {
              let teamMembers: object[] = playerList[i].team.members;
              
              if(playerList[i].team.members.length == 1 && playerList[i].team.members[0].steamId == playerList[i].steamid) {
                filteredPlayers.push(playerList[i]);
                continue;
              }

              if(playerList[i].team.members.length > 0) {
                  continue;
              }

              filteredPlayers.push(playerList[i])
          }

          playerList = filteredPlayers;
      })).catch((err) => {
          throw new Error(err)
      })
  })

  function titleCase(str: string) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      return splitStr.join(' '); 
  };

  const HandleDropDownRequest = (el: any) => {
      let img: HTMLElement = el.target;        
      let targetNode: HTMLElement = el.target.parentNode.parentNode.parentNode; // I know, dodgy af but it's getting the correct parent of the row :)
      
      if(img.dataset.hasCollapsed == "true") {
          targetNode.style.maxHeight = maxHeightCache
          img.style.transform = 'unset'
          img.dataset.hasCollapsed = 'false'
      } else {
          maxHeightCache = targetNode.style.maxHeight;
          targetNode.style.maxHeight = 'unset'
          img.style.transform = 'rotateZ(180deg)'
          img.dataset.hasCollapsed = 'true'
      }
  };

  const HandleSteamIdEnterChange = (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
      let allRows: HTMLCollectionOf<Element> | undefined = document.getElementById('container')?.getElementsByClassName('position-row');
      let correctRow: HTMLElement | null = null;
      if(steamIdEntered != "") {
          if(allRows != undefined) {
              let firstRow: HTMLElement = allRows[0] as HTMLElement;
              if(firstRow.style.display != 'none') {
                  for(let i=0; i < allRows.length; i++) {
                      correctRow = allRows[i] as HTMLElement;
                      correctRow.style.display = 'none'
                  }
              }
          } else {
              throw new Error('Unable to get all rows.')
          }
      } else {
          if(allRows != undefined) {
              for(let i=0; i < allRows.length; i++) {
                  correctRow = allRows[i] as HTMLElement;
                  correctRow.style.display = 'block'
              }
          } else {
              throw new Error('Unable to get all rows.')
          }
      }

      let errorMessage: any = document.getElementById('error-message');
      let hasFound: PositionMember | undefined = filteredPlayers.find(o => o.steamid === steamIdEntered || o.personaname === steamIdEntered);        
      if(hasFound != undefined || steamIdEntered == "") {
          singlePositionShow = hasFound;
          errorMessage.style.display = 'none';
      } else {
          singlePositionShow = undefined;
          errorMessage.style.display = 'flex';
      }
  };
</script>

<style>
  * {
      --body-main-color: #08060a;
      --border-default: rgba(255, 255, 255, .05);
      --inner-bg-light: rgba(255, 255, 255, .02);
      font-family: 'Inter Tight' !important;
  }

  main {
      width: 100vw;
      background-color: var(--body-main-color);
      margin: 0;
      padding: 0;
      border: none;
      font-family: 'Inter Tight' !important;
  }

  main h1 {
      color: white;
      margin: 20px 0px;
  }

  main h2 {
      color: white;
      margin: 20px 0px;
  }

  main p {
      color: white;
      font-size: 1.2em;
      margin: 20px 0px;
  }

  main #container {
      width: 80%;
      margin: 0 auto;
      padding: 40px;
      box-sizing: border-box;
  }

  main input {
      width: 100%;
      height: 70px;
      border: 1px solid var(--border-default);
      padding: 0px 20px;
      box-sizing: border-box;
      background-color: var(--inner-bg-light);
      border-radius: 10px;
      font-family: 'Inter Tight' !important;
      color: white;
      font-size: 1.2em;
  }

  input::placeholder {
      font-family: 'Inter Tight' !important;
      color: white;
      font-size: 1em;
  }

  .position-row {
      width: 100%;
      border: 1px solid var(--border-default);
      border-radius: 10px;
      background-color: var(--inner-bg-light);
      padding: 10px;
      box-sizing: border-box;
      margin: 20px 0px;
      max-height: 200px;
      overflow: hidden;
      position: relative;

      animation: fadeIn 0.5s cubic-bezier(0.25, 1, 0.5, 1);

      transition: max-height 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .position-row.force-display {
      display: block !important;
  }

  @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
  }

  .position-row button {
      position: absolute;
      top: 25px;
      right: 25px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      background-color: inherit;
  }

  .position-row button img {
      width: 35px;
      height: 35px;
      filter: invert();
      transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .position-row .row {
      width: 100%;
      display: inline-flex;
      flex-direction: row;
      flex-wrap: wrap;
  }

  .header-row {
      align-items: center;
      margin-bottom: 10px;
      width: 80% !important;
      flex-wrap: nowrap !important;
  }

  .holder {
      width: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 20px 10px 10px;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, .17);
  }

  .holder.first {
      background-color: #dd0355;
  }

  .holder.first p {
      color: black !important;
  }

  .holder.second {
      background-color: #d1cfd1;
  }

  .holder.second p {
      color: black !important;
  }

  .holder.third {
      background-color: #ff8126;
  }

  .holder.third p {
      color: black !important;
  }

  .position-icon {
      margin-right: 20px;
  }

  .position-icon img {
      width: 35px;
      height: 35px;
  }

  .position-icon p {
      margin: 0;
      margin-left: 5px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 1.8em;
      color: rgb(164, 164, 164);
      font-family: 'RobotoFlex' !important;
      font-variation-settings: "wdth" 151,"GRAD" 150,"slnt" 0,"XTRA" 603,"XOPQ" 96,"YOPQ" 79,"YTLC" 514,"YTUC" 712,"YTAS" 750,"YTDE" -203,"YTFI" 738;
  }

  .player-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0px 0px;
      min-height: 60px;
  }

  .player-info img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
  }

  .player-info h3 {
      color: white;
      font-size: 1.5em;
      margin: 0;
      margin-left: 10px;
  }

  .flexable-row {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap;
      gap: 10px;
      margin: 10px 0px 0px 0px;
  }

  .flex-box {
      display: inline-flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 40px;
      box-sizing: border-box;
      background-color: var(--inner-bg-light);
      border: 1px solid var(--border-default);
      border-radius: 5px;
  }

  .flex-box h4 {
      color: white;
      margin: 5px 0px 0px 0px;
      font-size: 1.2em;
  }

  .flex-box p {
      margin: 0;
      font-size: 1.4em;
      text-align: center;
      min-width: 150px;
  }

  #awaiting-message {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
  }

  #error-message {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      display: none;
      animation: fadeIn 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  #awaiting-message p {
      font-size: 1.4em;
      color: rgb(230, 230, 230, 0.6);
      font-weight: 600;
      text-align: center;
  }

  .loader {
      width: 40px;
      height: 40px;
      display: inline-block;
      position: relative;
      margin-right: 10px;
  }

  .loader::after,
  .loader::before {
      content: '';  
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid rgb(230, 230, 230, 0.6);
      position: absolute;
      left: 0;
      top: 0;
      animation: animloader 2s linear infinite;
  }

  @keyframes animloader {
      0% {
          transform: scale(0);
          opacity: 1;
      }
      100% {
          transform: scale(1);
          opacity: 0;
      }
  }

  @media screen and (max-width: 1000px) {
      #container {
          width: 100% !important;
      }
  }

  @media screen and (max-width: 730px) {
      main {
          font-size: 14px;
      }

      .position-icon img {
          width: 30px;
          height: 30px;
      }

      .position-icon p {
          font-size: 1.6em;
      }

      .player-info img {
          width: 40px;
          height: 40px;
      }

      .position-row button img { 
          width: 30px;
          height: 30px;
      }

      .position-row {
          max-height: 190px;
      }

      .header-row {
          overflow: hidden;
      }
  }
</style>

<main>
  <div id="container">
      <h1>Solo Certified Position Checker</h1>
      <p>For solo runners who want to see exactly where they stand in No Hesi’s solo rankings.</p>

      <input type="text" bind:value={steamIdEntered} placeholder='Enter Steam ID / Screen Name 🔍' on:input={(e) => HandleSteamIdEnterChange(e)}>

      <h2>{steamIdEntered != "" ? "Your Search Results" : "Current Solo Positions (Within Top 500 Of Players)"}</h2>

      {#if !playerList}
          <div id="awaiting-message">
              <span class="loader"></span>
              <p>Awaiting Data...</p>
          </div>
      {/if}

      <div id="error-message">
          <p>Cannot find any results 😔 You're either not Certified (Top 500) or an error has occured.</p>
      </div>

      {#if singlePositionShow}
          {@const sps = singlePositionShow}
          <div class="position-row force-display">
              <div class="row header-row">
                  <button on:click={HandleDropDownRequest}><img src={collapseIcon} alt="collapse-arrow"></button>
                  <div class="position-icon">
                      {#if playerList.findIndex((x) => x.steamid == sps.steamid) + 1 == 1}
                          <div class="holder first">
                              <img src={logoBlack} alt="nohesi-position-logo-black">
                              <p>#{1}</p>
                          </div>
                      {:else if playerList.findIndex((x) => x.steamid == sps.steamid) + 1 == 2}
                          <div class="holder second">
                              <img src={logoBlack} alt="nohesi-position-logo-black">
                              <p>#{2}</p>
                          </div>
                      {:else if playerList.findIndex((x) => x.steamid == sps.steamid) + 1 == 3}
                          <div class="holder third">
                              <img src={logoBlack} alt="nohesi-position-logo-black">
                              <p>#{3}</p>
                          </div>
                      {:else}
                          <div class="holder">
                              <img src={logoGrey} alt="nohesi-position-logo-grey">
                              <p>#{playerList.findIndex((x) => x.steamid == sps.steamid) + 1}</p>
                          </div>
                      {/if}
                  </div>
                  <div class="player-info">
                      <img src={sps.avatarfull} alt={sps.personaname}>
                      <h3>{sps.personaname}</h3>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{sps.score.toLocaleString()}</p>
                      <h4>Score</h4>
                  </div>
                  <div class="flex-box">
                      <p>{sps.combo.toLocaleString()}</p>
                      <h4>Combo</h4>
                  </div>
                  <div class="flex-box">
                      <p>{titleCase(sps.car_model)}</p>
                      <h4>Vehicle</h4>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{sps.avg_speed}km/h</p>
                      <h4>Average Speed</h4>
                  </div>
                  <div class="flex-box">
                      <p>{sps.run_distance}km</p>
                      <h4>Distance</h4>
                  </div>
                  <div class="flex-box">
                      <p>{sps.run_time}</p>
                      <h4>Time Driving</h4>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{sps.server_title != null ? sps.server_title : 'Unknown'}</p>
                      <h4>Server </h4>
                  </div>
                  <div class="flex-box">
                      <p>{sps.cars_passed}</p>
                      <h4>Cars Passed</h4>
                  </div>
                  <div class="flex-box">
                      <p>{sps.lives_left}</p>
                      <h4>Lives Remaining</h4>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{sps.traffic_type != null ? sps.traffic_type : "Unknown"}</p>
                      <h4>Traffic Type</h4>
                  </div>
                  <div class="flex-box">
                      <p>{sps.input}</p>
                      <h4>Input Type</h4>
                  </div>
              </div>
          </div>
      {/if}
      
      {#each playerList as player}
          <div class="position-row">
              <div class="row header-row">
                  <button on:click={HandleDropDownRequest}><img src={collapseIcon} alt="collapse-arrow"></button>
                  <div class="position-icon">
                      {#if playerList.findIndex((x) => x.steamid == player.steamid) + 1 == 1}
                          <div class="holder first">
                              <img src={logoBlack} alt="nohesi-position-logo-black">
                              <p>#{1}</p>
                          </div>
                      {:else if playerList.findIndex((x) => x.steamid == player.steamid) + 1 == 2}
                          <div class="holder second">
                              <img src={logoBlack} alt="nohesi-position-logo-black">
                              <p>#{2}</p>
                          </div>
                      {:else if playerList.findIndex((x) => x.steamid == player.steamid) + 1 == 3}
                          <div class="holder third">
                              <img src={logoBlack} alt="nohesi-position-logo-black">
                              <p>#{3}</p>
                          </div>
                      {:else}
                          <div class="holder">
                              <img src={logoGrey} alt="nohesi-position-logo-grey">
                              <p>#{playerList.findIndex((x) => x.steamid == player.steamid) + 1}</p>
                          </div>
                      {/if}
                  </div>
                  <div class="player-info">
                      <img src={player.avatarfull} alt={player.personaname}>
                      <h3>{player.personaname}</h3>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{player.score.toLocaleString()}</p>
                      <h4>Score</h4>
                  </div>
                  <div class="flex-box">
                      <p>{player.combo.toLocaleString()}</p>
                      <h4>Combo</h4>
                  </div>
                  <div class="flex-box">
                      <p>{titleCase(player.car_model)}</p>
                      <h4>Vehicle</h4>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{player.avg_speed}km/h</p>
                      <h4>Average Speed</h4>
                  </div>
                  <div class="flex-box">
                      <p>{player.run_distance}km</p>
                      <h4>Distance</h4>
                  </div>
                  <div class="flex-box">
                      <p>{player.run_time}</p>
                      <h4>Time Driving</h4>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{player.server_title != null ? player.server_title : 'Unknown'}</p>
                      <h4>Server </h4>
                  </div>
                  <div class="flex-box">
                      <p>{player.cars_passed}</p>
                      <h4>Cars Passed</h4>
                  </div>
                  <div class="flex-box">
                      <p>{player.lives_left}</p>
                      <h4>Lives Remaining</h4>
                  </div>
              </div>
              <div class="row flexable-row">
                  <div class="flex-box">
                      <p>{player.traffic_type != null ? player.traffic_type : "Unknown"}</p>
                      <h4>Traffic Type</h4>
                  </div>
                  <div class="flex-box">
                      <p>{player.input}</p>
                      <h4>Input Type</h4>
                  </div>
              </div>
          </div>
      {/each}    
  </div>
</main>