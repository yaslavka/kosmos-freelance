import r from './constants/routes.constants'

import Home from './pages/public/Home'
import SignIn from './pages/public/SignIn'
import Leader from './pages/private/Leader'
import Matrix from './pages/private/mareix'
import Tablem from './pages/private/mareix/Table'
import TableQueuem from './pages/private/mareix/TableQueue'
import Kepler from './pages/private/Kepler'
import KeplerTableQueue from './pages/private/Kepler/TableQueue'
import KeplerTable from './pages/private/Kepler/Table'
import Dashboard from "./pages/private/Dashboard";
import Finances from "./pages/private/Finances";
import News from "./pages/private/News";
import PremiumStars from './pages/private/AutoStars'
import PremiumStarsTable from './pages/private/AutoStars/Table'
import MStars from "./pages/private/matrix4";
import MTable from "./pages/private/matrix4/Table";
import SStars from "./pages/private/SuperStars";
import STable from "./pages/private/SuperStars/Table";
import StarTrek from './pages/private/StarTrek'
import StarTrekPlanets from './pages/private/StarTrek/MyPlanets'
import StarTrekStatistic from './pages/private/StarTrek/Statistic'
import Milkyway from "./pages/private/StarTrek-new";
import MyPlanetsmilkyway from "./pages/private/StarTrek-new/MyPlanets";
import Statisticmilkyway from "./pages/private/StarTrek-new/Statistic";
import Exchange from './pages/private/exchange/pages/ETHBTC'
import Casino from './pages/private/Casino/Casino'
import StarsUp from './pages/private/StarsUp'
import Myinvest from './pages/private/StarsUp/component/Myinvest'
import Histori from './pages/private/StarsUp/component/Histori'
import AboutUs from './pages/private/AboutUs'
import Team from './pages/private/Team'
import Settings from "./pages/private/Settings";
import SignUp from "./pages/public/SignUp";
import ResetPassword from "./pages/public/ResetPassword";
import Chat from "./pages/private/Chat/chat";
import Nukeworld from "./pages/private/Casino/components/vvvvv";
import MyMaterial from "./pages/private/MyMaterial";
import RocketsTables from "./pages/private/Rockets";
import RocketsTableQueue from "./pages/private/Rockets/TableQueue";
import RocketsTable from "./pages/private/Rockets/Table";
import IonTables from "./pages/private/Ion";
import IonTableQueue from "./pages/private/Ion/TableQueue";
import IonTable from "./pages/private/Ion/Table";
import RoyalsTables from "./pages/private/Royals";
import RoyalsTable from "./pages/private/Royals/Table";
import Savethehamster from "./pages/private/Casino/components/7777";
import Forestdreams from "./pages/private/Casino/components/zzz";
import Blacs from "./pages/private/Casino/components/DDD";
import Blacsd from "./pages/private/Casino/components/777";
import Roll from "./pages/private/Casino/components/roulette";
import Christmas from "./pages/private/Casino/components/ChristmasParty";
import MagicWhee from "./pages/private/Casino/components/MagicWheel";
import ETRace from "./pages/private/Casino/components/ETRaces";
import Blaccd from "./pages/private/Casino/components/cccc";
import Raccoontales from "./pages/private/Casino/components/blac";
import Smm from "./pages/private/SMM";
import Snapsocial from "./pages/private/SMM/pages/Snapsocial";
import JuegoRuleta from "./pages/private/Casino/components/JuegoRuleta";
import Megaciti from "./pages/private/Casino/components/MegaCity/Megaciti";
import DICE from "./pages/private/Casino/components/dice/App";
import Fool from "./pages/private/Casino/components/fool/Casino";
import Canvas from "./pages/private/Casino/components/Slots/components/Canvas";
import Bar from "./pages/private/Casino/components/Slots/BAR/App";
import Cost from "./pages/private/Casino/components/cost/Components/Cost";
import Costs from "./pages/private/Casino/components/Costs/Costs";
import Monk from "./pages/private/Casino/components/obesyn";
import Booom from "./pages/private/Casino/components/Boom";


export const publicRouteConfig = [
  {
    id: '6bd16003-a02d-43d6-97d5-b94433055e27',
    path: r.root,
    component: Home,
    exact: true,
  },
  {
    id: '8bcb9969-6c40-44ed-910f-b2e41e29308b',
    path: r.signIn,
    component: SignIn,
    exact: true,
  },
  {
    id: '0aa2a683-6840-4a97-a258-b5247f20ac52',
    path: r.signUp,
   component: SignUp,
    exact: true,
  },
  {
    id: 'c007b79a-ee31-4bbb-9282-91937f96e341',
    path: r.resetPassword,
    component: ResetPassword,
    exact: true,
  },
]

export const panelRouteConfig = [
  {
    id: 'dbfec38e-c96d-4c50-8cec-43d775bb38b8',
    path: r.leader,
    component: Leader,
    exact: true,
  },
  {
    id: '6705c818-7c9f-4757-bf1f-0d20e2b0700a',
    path: r.dashboard,
    component: Dashboard,
    exact: true,
  },
  {
    id: '3fd9cbab-e44e-4cc7-82c5-da52238f7f44',
    path: r.finances,
    component: Finances,
    exact: true,
  },
  {
    id: 'f748dad1-b173-4df0-bce4-6cb87e576637',
    path: [r.news, r.newsItem],
    component: News,
    exact: true,
  },
  {
    id: '5a02e43a-028e-4a64-9de7-a8495c4a289f',
    path: r.tables,
    component: Kepler,
    exact: true,
  },
  {
    id: '470c1df2-4bf9-4c41-897a-b7267e53aa68',
    path: [r.personalTable, r.table],
    component: KeplerTable,
    exact: true,
  },
  {
    id: 'fa4bc3a7-6bea-47ae-bb00-9bba1f1f3349',
    path: [r.personalTableQueue, r.tableQueue],
    component: KeplerTableQueue,
    exact: true,
  },
  {
    id: '5a02e212143a-028e-4a64-9de7-a8495c4a289f',
    path: r.matrixs,
    component: Matrix,
    exact: false,
  },
  {
    id: '470c1df2-4bf9-4566c41-897a-b7267e53aa68',
    path: [r.personalTablem, r.tablem],
    component: Tablem,
    exact: true,
  },
  {
    id: 'fa4bc3a7-6bea454-47ae-bb00-9bba1f1f3349',
    path: [r.personalTableQueuem, r.tableQueuem],
    component: TableQueuem,
    exact: true,
  },
  {
    id: '357f592b-1be8-41d5-a8a3-b62fc8d718d5',
    path: r.premiumStars,
    component: PremiumStars,
    exact: true,
  },
  {
    id: '0d949aa4-725e-4cad-a58f-a1b843e27515',
    path: [r.premiumTable, r.personalPremiumTable],
    component: PremiumStarsTable,
    exact: true,
  },
  {
    id: '5a02e43a-028e-4a64-9de7-a84fgf95c4a289f',
    path: r.matrixmini,
    component: MStars,
    exact: true,
  },
  {
    id: '470c1df2-4bf9-4c41-897a-b7267ehfd53aa68',
    path: [r.personalTablemini, r.tablemmini],
    component: MTable,
    exact: true,
  },
  {
    id: '109425a8-752d-42a5-83f2-98167f22d9cb',
    path: r.superStars,
    component: SStars,
    exact: true,
  },
  {
    id: '1c2cb6b0-4bf1-466a-bf84-bc9e71e40dda',
    path: [r.personalSSTable, r.ssTable],
    component: STable,
    exact: true,
  },

  {
    id: '5a02e212143a-028e-4a64-9de7-a84shfiuhfc4a289f',
    path: r.rockets,
    component: RocketsTables,
    exact: false,
  },
  {
    id: '470c1df2-4bf9-45as66c41-897a-b72dfs67e53aa68',
    path: [r.personalTableRockets, r.tableRockets],
    component: RocketsTable,
    exact: true,
  },
  {
    id: 'fa4bc3a7-6beadsgd454-47dgsdae-bb00-9bbass1f1f3349',
    path: [r.personalTableQueueRockets, r.tableQueueRockets],
    component: RocketsTableQueue,
    exact: true,
  },

  {
    id: '5a02e212gsds143a-028e-4a64-9de7-a84shfiuhfc4a289f',
    path: r.ion,
    component: IonTables,
    exact: false,
  },
  {
    id: '470csdfsd1df2-4bf9-45as66c41-897a-b72dfs67e53aa68',
    path: [r.personalTableion, r.tableion],
    component: IonTable,
    exact: true,
  },
  {
    id: 'fa4bc3a7-6bsdgsdea454-47dgsdae-bb00-9bbass1f1f3349',
    path: [r.personalTableQueueion, r.tableQueueion],
    component: IonTableQueue,
    exact: true,
  },

  {
    id: '5a02e212teregsds143a-028e-4a64-9de7-a84shfiuhfc4a289f',
    path: r.royal,
    component: RoyalsTables,
    exact: false,
  },
  {
    id: '470csdfsd1df2-4beryrf9-45as66c41-897a-b72dfs67e53aa68',
    path: [r.personalTableroyal, r.tableroyal],
    component: RoyalsTable,
    exact: true,
  },
  {
    id: 'fa4bc3a7-6bsdgsdea454-47dgserrgddae-bb00-9bbass1f1f3349',
    path: [r.personalTableQueueroyal, r.tableQueueroyal],
    component: IonTableQueue,
    exact: true,
  },
  {
    id: 'a682cca2-82df-4daa-81ed-70cc6868d3e2',
    path: r.starTrek,
    component: StarTrek,
    exact: true,
  },
  {
    id: '3c6eb283-5d8c-4775-b9d0-43c640c3d6ab',
    path: r.starTrekPlanets,
    component: StarTrekPlanets,
    exact: true,
  },
  {
    id: 'ef10ab44-2bc9-4498-a8e8-b89d31060a10',
    path: r.starTrekStatistic,
    component: StarTrekStatistic,
    exact: true,
  },
  {
    id: 'a682cca2-82df-4daa-81ed-70ccs65df4zs5',
    path: r.milkyway,
    component: Milkyway,
    exact: true,
  },
  {
    id: '3c6eb283-5d8c-4775-b9d0-43c64f5sd4f5z4',
    path: r.milkywayPlanets,
    component: MyPlanetsmilkyway,
    exact: true,
  },
  {
    id: 'ef10ab44-2bc9-4498-a8e8-b89d3156s1fs5',
    path: r.milkywayStatistic,
   component: Statisticmilkyway,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454hgdfhgaf',
    path:  r.exchange,
    component: Exchange,
    exact: true,
  },
  {
    id: '95e18993-3c49-41ac-9046-dad7df4d0362',
    path: r.exchang,
    component: Exchange,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454gf',
    path: r.casino,
    component: Casino,
    exact: true,
  },
  {
    id: 'bb41be1a-b5a0-4502-a06b-a338ea47904d',
    path: r.starsUp,
    component: StarsUp,
    exact: true,
  },
  {
    id: 'd321bf61-e67a-4809-9dd9-d8a425917178',
    path: r.myinvestments,
    component: Myinvest,
    exact: true,
  },
  {
    id: 'investbox_pack_history_table_wrapper',
    path: r.investbox,
    component: Histori,
    exact: true,
  },
  {
    id: '1dcd587d-a25f-466b-aaa9-b8f943874d05',
    path: r.aboutUs,
    component: AboutUs,
    exact: true,
  },
  {
    id: 'fd8a91bc-d70f-4918-a510-5510cd7a81c8',
    path: r.team,
    component: Team,
    exact: true,
  },
  {
    id: '1987f95f-f16c-4388-b878-8b7726b1c248',
    path: `${r.team}/:userId`,
    component: Team,
    exact: true,
  },
  {
    id: '0a51ed92-9f9f-4d95-9bf3-fb47eb36289f',
    path: [r.educations],
    component: MyMaterial,
    exact: true,
  },
  // {
  //   id: '0a51ed92-9f9f-4d95-9bf3-fb47eb36289f',
  //   path: [r.education, r.educationComment, r.educationForm],
  //   component: MyMaterial,
  //   exact: true,
  // },
  {
    id: '1tdfrd-5845bf-42gg40-82d-45847sdfa477',
    path: r.chat,
    component: Chat,
    exact: true,
  },
  {
    id: '0ea39de5-795b-45a8-b40e-a66b75f5e514',
    path: r.settings,
    component: Settings,
    exact: true,
  },
  {
    id: '0ea39de5-795b-45a8-b40e-ab75f5e514',
    path: r.smm,
    component: Smm,
    exact: true,
  },
  {
    id: '0ea39de5-795b-45a8-b454540e-ab75f5e514',
    path: r.smmsoc,
    component: Snapsocial,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e45',
    path: r.rollet,
    component: JuegoRuleta,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4154kjkjhkf',
    path: r.megacity,
    component: Megaciti,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454589361',
    path: r.dice,
    component: DICE,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454561',
    path: r.fool,
    component: Fool,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e45456147',
    path: r.slots,
    component: Canvas,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454561479',
    path: r.barr,
    component: Bar,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454561474',
    path: r.cost,
    component: Cost,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e4545614740',
    path: r.costs,
    component: Costs,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e45458414740',
    path: r.obes,
    component: Monk,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454584147477',
    path: r.boom,
    component: Booom,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-82d-ec4174e454584147477',
    path: r.raccoontales,
   component: Raccoontales,
    exact: true,
  },
  {
    id: 'b611f7b-58bf-4230-82d-ec4174e454584147477',
    path: r.nukeworld,
    component: Nukeworld,
    exact: true,
  },
  {
    id: 'b611f7b-58bf-4230-82d-ec4174e4545847477',
    path: r.blaacb,
    component: Blaccd,
    exact: true,
  },
  {
    id: '1tdd-5845bf-423440-82d-ec4174e4545847477',
    path: r.blaa,
    component: Blacsd,
    exact: true,
  },
  {
    id: '1tdd-5845bf-423440-82d-ec4174e4545847477',
    path: r.lacs,
    component: Blacs,
    exact: true,
  },
  {
    id: '1tdffrd-5845bf-423440-82d-ec4174e4545847477',
    path: r.savethehamster,
    component: Savethehamster,
    exact: true,
  },
  {
    id: '1tdddfrd-5845bf-423440-82d-ec4174e4545847477',
    path: r.forestdreams,
    component: Forestdreams,
    exact: true,
  },
  {
    id: '1tdfrd-5845bf-423440-82d-ec4174e4545847477',
    path: r.roll,
    component: Roll,
    exact: true,
  },
  {
    id: '1tdfrd-5845bf-42gg40-82d-ec4174e4545847477',
    path: r.magicwhee,
    component: MagicWhee,
    exact: true,
  },
  {
    id: '1tdfrd-5845bf-42gg40-82d-174e4545847477',
    path: r.christmasparty,
   component: Christmas,
    exact: true,
  },
  {
    id: '1tdfrd-5845bf-42gg40-82d-45847477',
    path: r.etraces,
    component: ETRace,
    exact: true,
  },
]
