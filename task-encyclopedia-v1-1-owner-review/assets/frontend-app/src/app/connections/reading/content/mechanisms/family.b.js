/**
 * FAMILY. A family tie carries history and expectation, so the weight falls on roles that outlast the reason for them, on how much closeness each can offer, and on distance that is healthy rather than a failure. Part b (emotional expression, visibility, change, initiative, abstraction).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 * Neutral keys (shared, opposed, oneSided) serve every family tie, so they speak of "the family" and never of one kind of relative. The directed keys (opposed:<pole>) speak of the older generation in effect: {first} holds the pole, {second} the other.
 */
const FAMILY_B = {
    /* ------------------------------------------------------------ emotional-expression -- */
    'emotional-expression/shared:emotionally-expressive': {
        title: { en: 'Feeling said as it is felt', sk: 'Pocit povedaný hneď, ako príde' },
        passage: {
            en: '{both} tend to say what is felt as it is felt, so thanks, worry and irritation can reach the other at the same speed. Little tends to be left to guess, and warmth is easy to come by.\n\nThe same speed is where it can go wrong. A sharp remark can be answered in kind before either has chosen a tone, and the answer can become the next provocation. Each can be finished with the quarrel while the other is still holding the sentence that began it. Said fast, a sentence can outlast the quarrel it started; taken back as fast, it can leave with the quarrel.',
            sk: '{both} majú sklon hovoriť, čo cítia, hneď ako to cítia, takže vďaka, obava aj podráždenie sa k druhému môžu dostať rovnako rýchlo. Domýšľať treba len máločo a tepla býva dosť.\n\nPráve táto rýchlosť však môže zradiť. Na ostrú poznámku môže prísť rovnako ostrá odpoveď skôr, než si ktokoľvek zvolí tón, a z odpovede sa môže stať ďalšia provokácia. Jeden už môže mať hádku za sebou, kým druhý ešte nosí v sebe vetu, ktorou sa začala. Veta povedaná rýchlo môže hádku prežiť; ak sa rovnako rýchlo vezme späť, môže odísť spolu s hádkou.',
        },
        aside: {
            en: 'Thanks and irritation can reach the other just as fast when {both} say what is felt as it is felt. Each can be finished with a quarrel while the other is still holding the sentence that began it.',
            sk: 'Vďaka aj podráždenie sa k druhému môžu dostať rovnako rýchlo, keď {both} hovoria, čo cítia, hneď ako to cítia. Jeden už môže mať hádku za sebou, kým druhý ešte nosí v sebe vetu, ktorou sa začala.',
        },
        step: { en: 'Agree on a short phrase, such as “that came out wrong”, that either of you can use to take a sentence back and say it again.', sk: 'Dohodnite sa na krátkej vete, napríklad „to vyšlo zle“, ktorou môže ktokoľvek z vás vziať vetu späť a povedať to znova.' },
        question: { en: 'Which of you tends to hold on to a sharp sentence longer, and what would help it be let go?', sk: 'Kto z vás si ostrú vetu zvykne niesť dlhšie a čo by pomohlo tú vetu pustiť?' },
    },
    'emotional-expression/shared:emotionally-contained': {
        title: { en: 'Care that arrives as a task', sk: 'Starostlivosť podaná ako úloha' },
        passage: {
            en: '{both} tend to put care into a task, so a lift offered, a meal left behind or a form quietly filled in can carry what neither would say aloud. Each is likely to read the other’s deeds fluently, and nothing may need saying for the care to be understood.\n\nThat fluency has a blind edge. When deeds are the whole vocabulary, a deed that does not come can be the loudest thing either has to say, and a missed one is hard to tell from a meant one. The sentences that mark a turn, a thanks, an apology, a goodbye, have no usual place, so they can wait for a moment that does not arrive. What each understands without being told stays understood, and what is left unsaid stays open to two meanings.',
            sk: '{both} zvyknú starostlivosť vkladať do úloh, takže ponúknutý odvoz, nechané jedlo alebo potichu vyplnený formulár môžu niesť to, čo by nikto z nich nepovedal nahlas. Skutky toho druhého každý pravdepodobne číta ľahko a starostlivosť sa môže pochopiť aj bez slov.\n\nTáto ľahkosť má slepé miesto. Keď sú skutky jedinou rečou, skutok, ktorý nepríde, môže byť to najhlasnejšie, čo kto z nich vie povedať, a zabudnutý skutok sa ťažko rozlíši od zámerne vynechaného. Vety, ktoré patria k zlomovým chvíľam, ako vďaka, ospravedlnenie či rozlúčka, nemajú obvyklé miesto, a tak môžu čakať na chvíľu, ktorá nepríde. Čomu každý rozumie bez slov, tomu rozumie ďalej, a čo zostane nevyslovené, zostáva otvorené dvom výkladom.',
        },
        aside: {
            en: '{both} are likely to put care into a task, and each can read the other’s deeds with ease. A thanks, an apology or a goodbye then has no usual place, and it can wait for a moment that does not arrive.',
            sk: '{both} zvyknú starostlivosť prejavovať úlohou a skutky toho druhého vie každý ľahko prečítať. Vďaka, ospravedlnenie či rozlúčka potom nemajú obvyklé miesto a môžu čakať na chvíľu, ktorá nepríde.',
        },
        step: { en: 'Choose one thing that is usually done in silence and say, once, in a sentence, what it stands for.', sk: 'Vyberte jednu vec, ktorá sa zvyčajne robí mlčky, a raz jednou vetou povedzte, čo tým myslíte.' },
        question: { en: 'Which deed between you is carrying a sentence that has been left unsaid?', sk: 'Ktorý skutok medzi vami nesie vetu, ktorá nezaznela?' },
    },
    'emotional-expression/opposed': {
        title: { en: 'Said on one side, done on the other', sk: 'Jeden to povie, druhý to urobí' },
        passage: {
            en: '{p0} tends to say what is felt and to listen for the same in return. {p1} tends to do what is felt and to listen for it in what is done. Each can be offering care in full, in a form the other does not count by.\n\nSay {p0} tells the other on the phone how much a visit meant, and {p1} answers with a practical question about the journey home. The reply can sound like a change of subject to one ear and be the whole answer to the other. The misreading runs both ways, since a repair handed over without a word can be an errand for one and everything that needed saying for the other. What goes astray can be less the care than its translation.',
            sk: '{p0} zvyčajne hovorí o tom, čo cíti, a rovnaké slová čaká aj späť. {p1} cit skôr prejavuje skutkom a hľadá ten cit v tom, čo sa urobí. Každý môže dávať starostlivosť naplno, len v podobe, ktorú druhý nemusí spoznať.\n\nPovedzme, že {p0} do telefónu povie, čo znamenala návšteva, a {p1} odpovie praktickou otázkou na cestu domov. Jednému uchu môže odpoveď znieť ako zmena témy, druhému ako celá odpoveď. Nedorozumenie ide oboma smermi: oprava odovzdaná bez slova môže byť pre jedného vybavená pochôdzka a pre druhého všetko, čo bolo treba povedať. Stratiť sa môže skôr preklad než samotná starostlivosť.',
        },
        aside: {
            en: 'When it comes to showing feeling, {p0} tends to put it into words and listen for words in return, while {p1} tends to show it in deeds and look for it there. Each can be offering care in full, in a form the other does not count.',
            sk: 'Keď ide o prejavenie citu, {p0} zvyčajne hovorí slovami a slová čaká aj späť, kým {p1} skôr koná a odpoveď hľadá v skutkoch. Každý môže dávať starostlivosť naplno, len v podobe, ktorú druhý nemusí spoznať.',
        },
        step: { en: 'Next time one of you gives care in a form the other does not usually count, name it: “that was me saying it”.', sk: 'Keď niekto z vás prejaví starostlivosť v podobe, ktorú druhý obvykle za starostlivosť nepovažuje, pomenujte to: „aj takto sa to dá povedať“.' },
        question: { en: 'In what form do you each most easily recognise that you are cared for?', sk: 'V akej podobe každý z vás najľahšie spozná, že sa o vás niekto stará?' },
    },
    'emotional-expression/opposed:emotionally-expressive': {
        title: { en: 'Open feeling, answered in deeds', sk: 'Cit nahlas, odpoveď skutkom' },
        passage: {
            en: '{first} is the more likely of the two to say what is felt, on the phone, at the door, at the end of a visit. {second} is more likely to answer in the form that comes easily: a lift offered, a job taken off someone’s hands, a visit simply kept. Each can be replying, in a different form, to a message the other may not have counted.\n\nAcross generations the difference can carry extra weight. A feeling spoken by the older generation can arrive as an expectation of one in return, and a reply made of deeds can pass as no reply. {first} can leave a visit waiting for a sentence the day was already saying; {second} can leave it pressed for a sentence that does not come easily. A deed is an answer only once it is counted as one, and a spoken feeling stays an offer only while it is not heard as a demand.',
            sk: '{first} skôr povie nahlas, čo cíti: do telefónu, vo dverách, na konci návštevy. {second} skôr odpovie tak, ako to ide samo: ponúkne odvoz, prevezme prácu, jednoducho na návštevu príde. Každý môže odpovedať v inej reči na odkaz, ktorý druhému mohol uniknúť.\n\nMedzi generáciami môže mať ten rozdiel väčšiu váhu. Cit, ktorý vysloví staršia generácia, môže prísť ako očakávanie rovnakej odpovede a odpoveď zložená zo skutkov môže prejsť ako žiadna. {first} môže z návštevy odchádzať a stále čakať na vetu, ktorú celý deň hovoril sám; {second} môže odchádzať s tlakom vysloviť vetu, ktorá nejde ľahko. Skutok je odpoveďou, až keď sa ako odpoveď aj prijme, a vyslovený cit zostáva ponukou, kým sa nepočuje ako požiadavka.',
        },
        aside: {
            en: 'A feeling {first} says aloud can arrive, from the older generation, as an expectation of an answer in kind. {second} may reply in deeds, and a reply made of deeds can pass as no reply at all.',
            sk: 'Cit, ktorý {first} vysloví nahlas, môže od staršej generácie prísť ako očakávanie odpovede v rovnakej podobe. {second} môže odpovedať skutkami a odpoveď zložená zo skutkov môže prejsť ako žiadna.',
        },
        step: { en: 'Try answering once in the other’s form: a short sentence from the one who usually acts, a small deed from the one who usually speaks.', sk: 'Skúste raz odpovedať v reči toho druhého: krátkou vetou od toho, kto zvyčajne koná, malým skutkom od toho, kto zvyčajne hovorí.' },
        question: { en: 'What would count, for each of you, as a real answer to a feeling that has been said aloud?', sk: 'Čo by pre každého z vás bolo skutočnou odpoveďou na cit, ktorý zaznel nahlas?' },
    },
    'emotional-expression/opposed:emotionally-contained': {
        title: { en: 'Care in a jar, feeling in a sentence', sk: 'Starostlivosť v zaváranine, cit vo vete' },
        passage: {
            en: 'A jar pressed into the hands at the door, a question about whether the coat is warm enough, a lift offered to the station: {first} may say all of it that way. {second} is more likely to say it aloud, and then may wait a moment for something said back.\n\nWhat follows can go quiet on both sides. The sentence {second} says may meet a practical remark, which can be meant as warmth and received as a closed door. The deed can be received as a service and thanked as one, which leaves the jar thanked and what it carried unacknowledged. Each can be speaking a complete language; what is missing is a reader for the other’s.',
            sk: 'Zaváranina vtisnutá do rúk pri dverách, otázka, či je kabát dosť teplý, ponúknutý odvoz na stanicu: {first} takto môže povedať všetko. {second} to skôr povie nahlas a potom môže chvíľu čakať, či sa niečo ozve späť.\n\nPotom môže na oboch stranách zavládnuť ticho. Vetu, ktorú {second} povie, môže stretnúť praktická poznámka, myslená ako teplo, no prijatá ako zatvorené dvere. Skutok sa zas môže prijať ako služba, a tak sa za zaváraninu poďakuje ako za službu a to, čo niesla, zostane bez odozvy. Každý môže hovoriť úplným jazykom, len chýba niekto, kto by vedel čítať ten druhý.',
        },
        aside: {
            en: '{first} may show love by doing, so a practical remark or a jar pressed into the hands can be the whole message. {second} is more likely to say it aloud, and may wait for something said back and receive a question about the coat instead.',
            sk: '{first} môže lásku ukazovať činmi, takže praktická poznámka alebo zaváranina vtisnutá do rúk môže byť celým odkazom. {second} to skôr povie nahlas a môže čakať na slová späť, a namiesto nich dostať otázku na kabát.',
        },
        step: { en: 'Name one deed as the message it is, and give one spoken feeling a few words in answer before the practical remark.', sk: 'Pomenujte jeden skutok ako odkaz, ktorým je, a na jeden vyslovený cit odpovedzte pár slovami skôr než praktickou poznámkou.' },
        question: { en: 'What does a practical question or a pressed-on jar mean in your family, and what would the spoken version be?', sk: 'Čo vo vašej rodine znamená praktická otázka alebo vtisnutá zaváranina a ako by to znelo nahlas?' },
    },
    'emotional-expression/oneSided:emotionally-expressive': {
        title: { en: 'One voice sets the register', sk: 'Jeden hlas udáva tón' },
        passage: {
            en: '{lean} is inclined to say the feeling plainly, and {mid} has no marked preference, so a reply can come in words or in deeds and a spoken feeling is unlikely to go unanswered. The ease has a side effect: the open register can become the way the two talk without either having chosen it.\n\nThen {mid} may be answering in words that cost a little more than they seem to, and {lean} may take the fluent reply as the measure of what the other feels. A quieter answer on some occasion can read as a drop in warmth when it may only be a change of register. What looks like a shared way of talking may be one person’s, lent to the other.',
            sk: '{lean} zvykne pocit povedať priamo a {mid} nemá výraznú preferenciu, takže odpoveď môže prísť slovami aj skutkom a vyslovený pocit len ťažko zostane bez odozvy. Táto ľahkosť má vedľajší účinok: otvorená reč sa môže stať spôsobom, akým sa spolu rozprávajú, hoci si ten spôsob nikto z nich nevybral.\n\n{mid} potom možno odpovedá slovami, ktoré stoja o niečo viac námahy, než sa zdá, a {lean} môže plynulú odpoveď považovať za mieru toho, čo druhý cíti. Tichšia odpoveď pri nejakej príležitosti môže pôsobiť ako ochladnutie, hoci môže ísť len o zmenu tónu. Čo vyzerá ako spoločný spôsob reči, môže byť reč jedného, požičaná druhému.',
        },
        aside: {
            en: 'If {lean} says the feeling plainly and {mid} has no marked preference, the open register can become the default without either choosing it. The ease can hide that the register is one person’s, lent to the other.',
            sk: 'Ak {lean} povie pocit priamo a {mid} nemá výraznú preferenciu, otvorená reč sa môže stať samozrejmosťou, hoci sa na tom nikto nedohodol. Ľahkosť môže zakryť, že tá reč patrí jednému a druhému je len požičaná.',
        },
        step: { en: 'Once in a while, answer a spoken feeling in whichever form is easiest, even when that is a deed, and let the answer stand.', sk: 'Občas odpovedzte na vyslovený pocit tak, ako to ide najľahšie, aj keby to bol skutok, a nechajte odpoveď tak.' },
        question: { en: 'When is a spoken answer an effort for the one who gives it, and does the other know?', sk: 'Kedy je slovná odpoveď pre toho, kto odpovedá, námahou, a vie o tom ten druhý?' },
    },
    'emotional-expression/oneSided:emotionally-contained': {
        title: { en: 'One translator for two', sk: 'Jeden prekladateľ pre dvoch' },
        passage: {
            en: '{lean} tends to show care by doing, and {mid} shows no strong pull either way, so {mid} can read the deed and also put a word beside it. That tends to make {mid} the one who finishes the exchange. Say a repair is done: {mid} may supply the thanks, the guess at the feeling behind it, and often the feeling itself.\n\nSo the spoken sentence in this tie can end up being one person’s. {lean} may receive a thank-you for each task and take it to mean that the care has been fully heard. {mid} may sometimes want a word back and set the wish aside, because the deed is so plainly there. The two can go a long way on deeds and one translator, and still lack the sentence only {lean} could say.',
            sk: '{lean} zvykne starostlivosť prejavovať skutkom a {mid} sa nekloní výrazne ani na jednu stranu, takže {mid} vie skutok prečítať a zároveň pridať slovo. Výmenu tak zvyčajne dokončí {mid}. Povedzme, že je hotová oprava: {mid} môže dodať poďakovanie, odhad citu, ktorý za opravou stojí, a často aj samotný cit.\n\nVyslovená veta tak v tomto vzťahu môže patriť len jednému. {lean} môže za každú úlohu dostať poďakovanie a usúdiť z toho, že starostlivosť bola úplne vypočutá. {mid} si niekedy môže želať slovo späť a to želanie odložiť, lebo skutok je taký očividný. Spolu sa môžu dostať ďaleko so skutkami a jedným prekladateľom, a predsa im môže chýbať veta, ktorú vie povedať len {lean}.',
        },
        aside: {
            en: 'Where {lean} shows care by doing, {mid} can end up supplying the thanks and the sense made of the deed. The spoken sentence in the tie may then be only one person’s.',
            sk: 'Tam, kde {lean} prejavuje starostlivosť skutkom, môže {mid} napokon dodávať poďakovanie aj zmysel, ktorý sa zo skutku vyčíta. Vyslovená veta vo vzťahu potom môže patriť len jednému.',
        },
        step: { en: 'Once, ask the one who shows care by doing to say in a sentence what the deed was for, and let the other simply receive it.', sk: 'Raz nech ten, kto dáva starostlivosť skutkom, jednou vetou povie, načo bol skutok, a druhá strana to len prijme.' },
        question: { en: 'Who in this tie usually supplies the words, and how would it be if the other did?', sk: 'Kto vo vašom vzťahu zvyčajne dodáva slová a aké by to bolo, keby ich dodávala druhá strana?' },
    },
    /* ----------------------------------------------------------------------- social-energy -- */
    'social-energy/shared:private': {
        title: { en: 'Family in small measures', sk: 'Rodina v malých dávkach' },
        passage: {
            en: '{both} tend to prefer family in small measures: one relative at a time, news kept close. A visit between the two can be unhurried, and what is said tends to stay where it was told.\n\nThe wider family tends to be held together by someone’s effort, and neither is drawn to being that someone. A family gathering left unorganised, or news that reaches a relative second-hand, can each read to the wider family as a closed door. Two private people can keep their own tie warm and still be the pair the wider family does not hear from, because neither is inclined to be the one who calls.',
            sk: '{both} majú skôr radi rodinu v malých dávkach: jedného príbuzného naraz a novinky, ktoré sa nešíria ďalej. Pri vzájomnej návšteve sa nemusia nikam ponáhľať a čo sa povie, zvyčajne zostane medzi nimi.\n\nŠiršiu rodinu zvyčajne drží pokope niečie úsilie a túto úlohu nechce prevziať nikto z nich. Stretnutie, ktoré nikto nezorganizuje, alebo novinka, ktorá sa k tete dostane z druhej ruky, môže širšej rodine pripadať ako zatvorené dvere. Vlastný vzťah si môžu udržať teplý, a predsa byť dvojicou, od ktorej širšia rodina nič nepočuje, lebo zavolať sa nechce nikomu z nich.',
        },
        aside: {
            en: '{both} seem to like family in small measures, so confidences can hold and visits stay unhurried. The wider family, though, is kept together by someone’s effort, and neither is inclined to supply it.',
            sk: '{both} majú zrejme radi rodinu v malých dávkach, takže dôverné veci môžu zostať medzi nimi a návštevy sa nikam neženú. Širšiu rodinu však drží pokope niečie úsilie a túto úlohu nechce prevziať nikto z nich.',
        },
        step: { en: 'Decide together which one or two relatives you each want to stay in touch with.', sk: 'Spolu sa rozhodnite, s ktorým jedným či dvoma príbuznými chce každý z vás zostať v kontakte.' },
        question: { en: 'What would make it easier to actually pick up the phone: a reason, a date, or someone else going first?', sk: 'Čo by uľahčilo skutočne zavolať: dôvod, termín, alebo to, že sa niekto ozve prvý?' },
    },
    'social-energy/shared:social': {
        title: { en: 'Easy in company, seldom just two', sk: 'Ľahko medzi ľuďmi, zriedka len vo dvojici' },
        passage: {
            en: '{both} tend to meet in company, so contact may run through a full table, a family group chat, a kitchen with cousins coming and going. That can keep the wider family in view and the two of them in easy contact.\n\nWhat the arrangement can leave thin is the conversation with nobody else in it. A matter that belongs to two people is awkward to raise at a full table, and news told to one at a gathering can travel round the whole family. Each may learn, without discussing it, to say a little less to the other. A tie that is warm in company can go unused for the things only the two could say.',
            sk: '{both} sa zvyknú stretávať v spoločnosti, takže sa môžu vídať najmä pri plnom stole, v rodinnom chate či v kuchyni, kde sa striedajú bratranci a sesternice. Širšia rodina tak môže zostávať na očiach a kontakt medzi nimi ľahký.\n\nTenší môže zostať rozhovor, pri ktorom nie je nikto ďalší. Vec, ktorá patrí len dvom, sa pri plnom stole otvára ťažko a novinka povedaná jednému na stretnutí sa môže rozniesť po celej rodine. Každý sa tak môže mlčky naučiť hovoriť druhému o niečo menej. Vzťah, ktorý je teplý medzi ľuďmi, môže zostať nevyužitý práve na veci, ktoré by si mohli povedať len medzi sebou.',
        },
        aside: {
            en: 'In company {both} tend to be at ease, so contact can happen at a full table or in the group chat, and news told to one can reach everyone. A matter that belongs to the two alone has little setting of its own.',
            sk: 'V spoločnosti sa {both} zvyčajne cítia dobre, takže kontakt sa môže odohrávať pri plnom stole alebo v rodinnom chate a novinka povedaná jednému sa môže dostať ku všetkým. Veci, ktoré patria len dvom, tak majú málo vlastného priestoru.',
        },
        step: { en: 'Keep one regular contact that is only the two of you, a call or a walk, where nothing said is for passing on.', sk: 'Majte jeden pravidelný kontakt len vo dvojici, telefonát alebo prechádzku, kde nič z povedaného nejde ďalej.' },
        question: { en: 'What would you each tell the other only if no one else would hear of it?', sk: 'Čo by ste si povedali len vtedy, keby sa o tom nikto iný nedozvedel?' },
    },
    'social-energy/opposed': {
        title: { en: 'The big gathering and the quiet visit', sk: 'Veľké stretnutie a tichá návšteva' },
        passage: {
            en: '{p1} tends to be at ease in a crowd and to hear “let’s get everyone together” as an invitation. {p0} is more at ease with fewer people and may be at best one to one. The difference can stay out of sight until an occasion arrives: a holiday spent together, a long weekend, an unannounced visit. A piece of news can do the same, when one wants it shared and the other wants it kept. Then it can read as enthusiasm on one side and reluctance on the other, when it may only be two measures of enough company.\n\nA family has room for both measures, provided the quieter way of being together is counted as taking part, and not as a smaller version of the other.',
            sk: '{p1} sa v dave zvyčajne cíti dobre a „poďme sa všetci zísť“ počuje ako pozvanie. {p0} je radšej medzi menším počtom ľudí a najlepšie sa môže cítiť v rozhovore medzi štyrmi očami. Rozdiel môže zostať skrytý, kým nepríde príležitosť: spoločné sviatky, dlhý víkend, nečakaná návšteva, novinka, ktorú jeden chce rozniesť a druhý nechať pre seba. Potom to môže vyzerať ako nadšenie na jednej strane a neochota na druhej, hoci môže ísť len o dve rôzne miery toho, koľko spoločnosti stačí.\n\nRodina má miesto pre jednu aj druhú mieru, ak sa aj tichší spôsob, ako byť spolu, berie ako plnohodnotná účasť, a nie ako menšia verzia toho druhého.',
        },
        aside: {
            en: '{p1} tends to draw energy from company and gatherings, {p0} from fewer people and more time. At a family occasion {p0} may run out of company sooner, and what looks like reluctance may only be a different measure of enough.',
            sk: '{p1} zvykne čerpať silu zo spoločnosti a veľkých stretnutí, {p0} skôr z menšieho počtu ľudí a viac času. Na rodinnej oslave môže mať {p0} spoločnosti dosť skôr a to, čo vyzerá ako neochota, môže byť len iná miera toho, čo stačí.',
        },
        step: { en: 'Plan the next occasion with both measures in it: one part for everyone, one part for fewer.', sk: 'Naplánujte najbližšiu príležitosť s dvoma mierami: jedna časť pre všetkých, jedna pre menší počet ľudí.' },
        question: { en: 'What does a good visit look like for each of you, and where do the two pictures overlap?', sk: 'Ako vyzerá dobrá návšteva pre každého z vás a kde sa tie dve predstavy stretávajú?' },
    },
    'social-energy/opposed:private': {
        title: { en: 'Who hears the news first', sk: 'Kto sa dozvie novinku prvý' },
        passage: {
            en: '{second} tends to live family as a table with many chairs; {first}, as a few people at a time. On most days the two can meet comfortably in the smaller version. The difference can sharpen around news: a plan, a move, a new partner, an illness. {second} may share it as it comes, with whoever is near, and {first} may then hear it from a cousin.\n\n{first} can take that order as being the last to know, with a matter meant to stay close already gone round the family. {second} may have seen nothing to hold back, and the delay of a private word can look like keeping news from the people who would be glad of it. The question each is circling is less how much company than who hears first.',
            sk: '{second} má rodinu najradšej v plnom počte, {first} skôr po niekoľkých ľuďoch naraz. Väčšinu dní sa môžu pohodlne stretávať v tej menšej podobe. Rozdiel sa môže vyostriť pri novinkách: plán, sťahovanie, nový partner, choroba. {second} môže novinku povedať hneď, ako príde, komukoľvek, kto je nablízku, a {first} sa to potom môže dozvedieť od bratranca.\n\nTakéto poradie môže {first} brať tak, že sa to dozvedá medzi poslednými, keď sa vec, ktorá mala zostať v úzkom kruhu, už rozniesla po rodine. {second} zas možno nevidí dôvod čokoľvek zadržiavať a odklad kvôli súkromnému slovu môže vyzerať, akoby sa novinka tajila pred ľuďmi, ktorí by mali radosť. Otázka, okolo ktorej každý krúži, nie je ani tak to, koľko spoločnosti, ako skôr to, kto má novinku počuť najskôr.',
        },
        aside: {
            en: '{second} may share news as it comes, and {first} may then hear it from a cousin. The order in which people hear can matter more than the news itself.',
            sk: 'Ak {second} povie novinku hneď a komukoľvek, {first} sa to môže dozvedieť až od bratranca. Poradie, v akom sa ľudia niečo dozvedia, môže vážiť viac než samotná novinka.',
        },
        step: { en: 'Agree an order for news: who is told first, in person, before it travels to anyone else.', sk: 'Dohodnite sa, v akom poradí sa novinky povedia: kto sa ich dozvie najskôr a osobne, skôr než sa dostanú k ostatným.' },
        question: { en: 'Who should hear a piece of family news first, and who should hear it from you rather than from someone else?', sk: 'Kto by mal rodinnú novinku počuť ako prvý a kto by sa to mal dozvedieť od vás, a nie od niekoho iného?' },
    },
    'social-energy/opposed:social': {
        title: { en: 'Everyone will be there', sk: 'Všetci tam budú' },
        passage: {
            en: 'When {first} says “everyone will be there”, it is likely meant as an invitation; when {second} hears it, it can land as a weight. {first} may see the big gathering as how a family is kept together, and turning up as how a person shows belonging. {second} may prefer family in smaller doses, a visit for a meal or an afternoon with one relative, and to leave before the evening starts.\n\nThe same act can be read in two ways. A short visit can look like partial presence, and a crowded table can use up what {second} had for the conversation that mattered. Closeness can then come to be measured in attendance. The more useful measure may be whether the two have a form of contact that {second} can sustain and {first} can count.',
            sk: 'Keď {first} povie „všetci tam budú“, myslí to zrejme ako pozvanie; keď to počuje {second}, môže to pôsobiť ako ťarcha. Veľké stretnutie môže byť spôsob, akým {first} drží rodinu pokope, a prítomnosť zas spôsob, akým človek dáva najavo, že k rodine patrí. {second} sa môže radšej venovať rodine v menšej podobe, návštevou na obed alebo popoludním s jedným príbuzným, a odísť skôr, než sa večer rozbehne.\n\nTen istý krok sa dá vnímať dvojako. Krátka návšteva môže vyzerať ako polovičná prítomnosť a preplnený stôl môže vyčerpať silu, ktorá zostávala na dôležitý rozhovor. Blízkosť sa potom môže začať merať účasťou. Užitočnejšie môže byť sledovať, či majú taký spôsob kontaktu, ktorý {second} zvládne udržať a {first} uzná.',
        },
        aside: {
            en: 'When {first} says “everyone will be there”, it is likely meant as an invitation, and {second}, who may prefer family in smaller doses, can hear it as a weight. Closeness can then come to be measured in attendance.',
            sk: 'Keď {first} povie „všetci tam budú“, myslí to zrejme ako pozvanie. {second} sa však môže rodine radšej venovať v menšej podobe a počuť to ako ťarchu. Blízkosť sa potom môže začať merať účasťou.',
        },
        step: { en: 'Agree on the few occasions where it matters most that you are both there, and what a shorter visit would look like at the others.', sk: 'Dohodnite sa na niekoľkých príležitostiach, pri ktorých najviac záleží na tom, aby ste tam boli spolu, a na tom, ako by pri ostatných vyzerala kratšia návšteva.' },
        question: { en: 'Which gatherings does one of you really want the other at, and where would a shorter visit be enough?', sk: 'Na ktorých stretnutiach jednému z vás naozaj záleží na tom, aby ste tam boli spolu, a kde by stačila kratšia návšteva?' },
    },
    'social-energy/oneSided:private': {
        title: { en: 'The one who goes between', sk: 'Ten, čo chodí tam a späť' },
        passage: {
            en: '{lean} tends to prefer family in small measures and {mid} leans neither way, so {mid} can become the route by which the wider family and {lean} reach each other. {mid} may be the one who goes to the gathering and reports back, carries the news with care, explains the empty chair. That can let {lean} keep to the small circle while the wider family stays informed.\n\nThe arrangement holds as long as {mid} does not mind. Not minding is easy to treat as free: the invitations, the replies and the explanations can all pass through one person. {lean} may then become known to the wider family mostly through what {mid} says. An arrangement that rests on one person not minding can stop the day that person does.',
            sk: '{lean} má zvyčajne radšej rodinu v malých dávkach a {mid} sa nekloní ani k jednému, takže {mid} sa môže stať spojkou, cez ktorú sa širšia rodina a {lean} k sebe dostávajú. {mid} môže byť tým, kto chodí na stretnutia a podáva správy, s citom prináša novinky, vysvetľuje prázdnu stoličku. Vďaka tomu môže {lean} zostať v malom kruhu a širšia rodina má pritom prehľad.\n\nTakéto usporiadanie drží, kým to {mid} nevadí. To, že to niekomu nevadí, sa ľahko berie ako samozrejmosť: pozvania, odpovede aj vysvetlenia môžu ísť cez jedného človeka a širšia rodina môže toho, kto sa drží v ústraní, poznať hlavne z toho, čo povie {mid}. Usporiadanie, ktoré stojí na tom, že to jednému nevadí, sa môže skončiť v deň, keď to vadiť začne.',
        },
        aside: {
            en: '{mid} can become the family’s go-between when {lean} keeps to small measures. The invitations, the news and the explanations can then all pass through one person, which works as long as that person does not mind.',
            sk: 'Rodinnou spojkou sa môže stať {mid}, keď {lean} zostáva pri malých dávkach rodiny. Pozvania, novinky aj vysvetlenia potom môžu ísť cez jedného človeka, čo funguje, kým to tomu človeku nevadí.',
        },
        step: { en: 'Let the private one send a message directly to the wider family now and then, so that not everything travels by way of the other.', sk: 'Nech ten z vás, kto si viac cení súkromie, občas pošle správu priamo širšej rodine, aby všetko nechodilo cez druhého.' },
        question: { en: 'What does the one in the middle carry without anyone asking about it?', sk: 'Čo všetko nesie ten z vás, kto je uprostred, bez toho, aby sa na to niekto pýtal?' },
    },
    'social-energy/oneSided:social': {
        title: { en: 'A yes that costs little to give', sk: 'Áno, ktoré sa ľahko povie' },
        passage: {
            en: '{lean} tends to start the plans for company: who to invite, which weekend, how many at the table. {mid} has no clear taste either way and can join in or step back, so an argument is unlikely, and the gatherings tend to happen.\n\nIt also means the size of an occasion can be set by one preference, and the other has few reasons to say when it is too much. {mid} may agree to another gathering because agreeing costs little in the moment, and the cost can show later as a thinner welcome. {lean} is likely to read a yes as a yes. A yes that is easy to give is also easy to misread.',
            sk: '{lean} zvykne začínať plány na spoločné stretnutia: koho pozvať, ktorý víkend, koľko ľudí pri stole. {mid} nemá vyhranenú chuť ani jedným smerom a vie sa pridať aj ustúpiť, takže k hádke asi nedôjde a stretnutia sa zvyčajne uskutočnia.\n\nZnamená to aj to, že veľkosť stretnutia môže určovať jedna chuť a druhá strana má málo dôvodov povedať, že je toho priveľa. {mid} môže súhlasiť s ďalším stretnutím, lebo súhlas v tej chvíli stojí málo, a cena sa môže ukázať neskôr ako vlažnejšie privítanie. {lean} pravdepodobne berie áno ako áno. Ľahké áno sa ľahko vyloží zle.',
        },
        aside: {
            en: '{lean} has a clear taste for company and {mid} no strong pull either way, so {lean} tends to set the size of the occasion. When {mid} says an easy yes, it can be misread as a full one.',
            sk: '{lean} má jasnú chuť na spoločnosť a {mid} nemá výrazný sklon ani jedným smerom, takže veľkosť stretnutia zvyčajne určí {lean}. Keď {mid} povie ľahké áno, dá sa ľahko vziať za úplné.',
        },
        step: { en: 'Give the easy yes a second form: “yes to this one, and I would like the next to be smaller”.', sk: 'K ľahkému áno pridajte druhú polovicu vety: „na toto áno, nabudúce radšej v menšom“.' },
        question: { en: 'What stops “smaller next time” from being said: fear of the other’s disappointment, or the habit of saying yes?', sk: 'Čo bráni povedať „nabudúce radšej v menšom“: obava zo sklamania, alebo zvyk povedať áno?' },
    },
    /* ------------------------------------------------------------- change-and-steadiness -- */
    'change-and-steadiness/shared:stability-seeking': {
        title: { en: 'Two keepers of the familiar', sk: 'Spoločná vernosť známemu' },
        passage: {
            en: '{both} lean toward what is known over what is new: the same customs, the same way of keeping in touch, the same sense of how things are done. Each can usually predict the other, so little has to be negotiated, and in a family that predictability is itself a form of care.\n\nThe cost appears when life changes and the tie does not. Two people who value steadiness seldom quarrel about change; they postpone it. An arrangement made for an earlier situation can stay in place because nobody objects. The old roles can carry on past the reason for them, and so can the old order of who visits whom and who decides. Steadiness is rarely the difficulty; steadiness that nobody examines can be.',
            sk: '{both} sa prikláňajú skôr k známemu než k novému: rovnaké zvyky, rovnaký spôsob, ako sa držať v kontakte, rovnaký cit pre to, ako sa veci robia. Každý vie zhruba predvídať, čo urobí druhý, takže sa treba dohadovať len málo, a v rodine je predvídateľnosť sama o sebe istým druhom starostlivosti.\n\nCena sa ukáže, keď sa život zmení a vzťah nie. Keď si spoločne cenia stálosť, o zmene sa zriedka hádajú; zmenu odkladajú. Dohoda, ktorá vznikla pre dávnejšiu situáciu, môže zostať, lebo nikto nenamieta, a staré úlohy aj staré poradie, kto koho navštevuje a kto rozhoduje, sa tak ťahajú ďalej, hoci dôvod už zanikol. Stálosť problémom nie je. Problémom je stálosť, na ktorú sa nikto nepozrie.',
        },
        aside: {
            en: '{both} lean to the familiar over the new. That gives the tie its steadiness, and it also means an old arrangement can stay in place after it has stopped fitting, because neither is pushing to change it.',
            sk: '{both} sa prikláňajú skôr k známemu než k novému. To dáva vzťahu stálosť, no zároveň môže zostať aj stará dohoda, ktorá už nevyhovuje, lebo na zmenu netlačí nikto z nich.',
        },
        step: { en: 'Choose one small arrangement between you that was made for an earlier time, and change it on purpose, together, before life forces the question.', sk: 'Vyberte jednu malú dohodu z dávnejších čias a spolu sa rozhodnite pre zmenu, skôr než otázku vynúti život.' },
        question: { en: 'Which old arrangement between you was made for a time that has passed, and would either of you be glad to retire it?', sk: 'Ktorá stará dohoda medzi vami vznikla pre čas, ktorý je preč, a uľavilo by sa niekomu z vás, keby zanikla?' },
    },
    'change-and-steadiness/shared:novelty-seeking': {
        title: { en: 'Rituals that lapse without a decision', sk: 'Rituály, ktoré zaniknú bez rozhodnutia' },
        passage: {
            en: '{both} are not inclined to hold the family to how it was. A move, a new partner, a holiday kept in a new way: each is likely to be met with interest rather than a sigh. The two can be easy company for each other’s changes.\n\nWhat can go missing is the default. With neither inclined to keep the date, the dish, the place at the table, the rituals that made the family recognisable can lapse without any decision to end them. The first sign can be a gap neither remembers choosing. Two people who both like the new can also find that contact has nothing to rest on: each visit has to be invented, and invention needs both to have the energy at once. Openness to change keeps the tie flexible. A fixed point, however small, is what keeps it findable.',
            sk: '{both} nemajú sklon držať rodinu pri tom, ako to bývalo. Sťahovanie, nový partner, sviatky držané po novom: každú z týchto zmien pravdepodobne privítajú so záujmom, nie s povzdychom, a pri zmenách si môžu byť navzájom príjemnou spoločnosťou.\n\nChýbať môže pevné východisko. Keď nikto z nich nemá chuť držať termín, jedlo, miesto pri stole, rituály, podľa ktorých sa rodina dala spoznať, môžu zaniknúť bez rozhodnutia, že sa skončia. Prvým znamením môže byť medzera, na ktorú si nikto nespomína ako na vlastné rozhodnutie. Keďže sa im páči nové, môžu zistiť aj to, že kontakt sa nemá o čo oprieť: každú návštevu treba vymyslieť a vymýšľanie vyžaduje, aby mal každý silu v tej istej chvíli. Otvorenosť voči zmene udržiava vzťah pružný. Aby sa však dal nájsť, potrebuje pevný bod, hoci aj malý.',
        },
        aside: {
            en: '{both} are inclined to welcome change in each other’s lives, which keeps the tie flexible. If no one keeps the old date or dish, rituals can lapse without any decision to end them.',
            sk: '{both} majú sklon vítať zmeny v živote toho druhého, vďaka čomu je vzťah pružný. Ak nikto nedrží starý termín či jedlo, rituály môžu zaniknúť bez rozhodnutia, že sa skončia.',
        },
        step: { en: 'Pick one small fixed point, a date or a dish or a call, and keep it on purpose while everything else stays free to change.', sk: 'Vyberte jeden malý pevný bod, termín, jedlo alebo telefonát, a ten bod vedome dodržiavajte, kým všetko ostatné môže zostať voľné.' },
        question: { en: 'Which small ritual would the two of you miss most if it quietly stopped?', sk: 'Ktorý malý rituál by vám najviac chýbal, keby potichu prestal?' },
    },
    'change-and-steadiness/opposed': {
        title: { en: 'What the same news opens and closes', sk: 'Čo tá istá správa otvára a čo zatvára' },
        passage: {
            en: 'A new plan can reach the two as two different pieces of news. {p1} can hear what it opens: a different holiday, a new place, a way of doing things that suits better. {p0} can hear what it closes: the table that will not be set the same way, the visit that will not be made. Each can end up answering the news the other did not give.\n\nSo {p1} can take the worry for a judgment on the choice, and {p0} can take the enthusiasm for a verdict on the old way. The family needs what each carries, the thread back and the door forward. Much of the argument can be about whether the old is being refused, a different question from the one the change raised. A change told together with what carries over is a different piece of news from the change alone.',
            sk: 'Ten istý nový plán môže pre každého z dvojice znamenať inú správu. {p1} môže počuť, čo plán otvára: iné sviatky, nové miesto, spôsob, ktorý lepšie vyhovuje. {p0} môže počuť, čo zatvára: stôl, ktorý sa už neprestrie ako predtým, návštevu, ktorá sa neuskutoční. Každý potom môže odpovedať na správu, ktorú ten druhý nepovedal.\n\n{p1} tak môže obavu brať ako kritiku svojej voľby a {p0} nadšenie ako odsúdenie starého spôsobu. Rodina potrebuje, čo prináša každý z nich, spojenie s minulosťou aj dvere dopredu, a veľká časť sporu sa môže točiť okolo toho, či sa staré odmieta, čo je iná otázka než tá, ktorú zmena priniesla. Zmena oznámená spolu s tým, čo zostáva, je iná správa než zmena sama.',
        },
        aside: {
            en: '{p1} can hear a change for what it opens, {p0} for what it closes, so the same announcement can arrive as two pieces of news. Each can then answer the news the other did not give.',
            sk: '{p1} môže v zmene počuť to, čo otvára, {p0} to, čo zatvára, takže z jedného oznámenia môžu byť dve rôzne správy. Každý potom môže odpovedať na správu, ktorú ten druhý nepovedal.',
        },
        step: { en: 'When a change is announced, say in the same breath what it leaves as it was.', sk: 'Keď oznamujete zmenu, povedzte jedným dychom aj to, čo zostane po starom.' },
        question: { en: 'What in the present arrangement would be hardest to lose, and what would be a relief to change?', sk: 'Čo by vám v dnešnom usporiadaní najviac chýbalo a čo by ste s úľavou zmenili?' },
    },
    'change-and-steadiness/opposed:stability-seeking': {
        title: { en: 'Who inherits the family’s ways', sk: 'Kto zdedí rodinné zvyky' },
        passage: {
            en: '{first} tends to keep the family’s ways as they have been: the same dishes, the same order of the day, the same way of marking an occasion. {second} is more drawn to making family in a new form. A custom can be at stake whenever the two plan an occasion, because it is also a question of who inherits it and on what terms.\n\n{first} can hear a different plan as the end of something that was handed down, and {second} can hear the wish to keep the old plan as a condition attached to belonging. Each can be asking the other to carry something, and neither may have said what. A custom the next generation may remake a little is a different inheritance from one whose exact keeping is the price of belonging.',
            sk: '{first} zvykne držať rodinné zvyky tak, ako boli: tie isté jedlá, ten istý poriadok dňa, ten istý spôsob, ako sa oslavuje. {second} má skôr chuť robiť rodinné veci po novom. Zvyk môže byť v hre zakaždým, keď spolu plánujú nejakú príležitosť, lebo ide aj o to, kto zvyk zdedí a za akých podmienok.\n\n{first} môže iný plán počuť ako koniec niečoho, čo sa odovzdávalo z generácie na generáciu, a {second} môže túžbu držať sa starého plánu počuť ako podmienku, aby človek do rodiny patril. Každý môže od druhého žiadať, aby niečo niesol, a čo presne, to možno nezaznelo. Zvyk, ktorý smie nasledujúca generácia trochu pretvoriť, je iné dedičstvo než zvyk, ktorého presné dodržanie je cenou za príslušnosť k rodine.',
        },
        aside: {
            en: 'Planning an occasion can become a question of inheritance when {first} keeps a custom as it was and {second} proposes a new way. The old plan can sound like a condition of belonging, and the new one like the end of something handed down.',
            sk: 'Plánovanie sviatku či oslavy sa môže stať otázkou dedenia, keď {first} drží zvyk tak, ako bol, a {second} navrhuje nový spôsob. Starý plán môže znieť ako podmienka príslušnosti k rodine a nový ako koniec niečoho, čo sa odovzdávalo.',
        },
        step: { en: 'For one custom, name together what stays exactly as it is and what may be remade by whoever carries it on.', sk: 'Pri jednom zvyku spolu pomenujte, čo zostane presne tak, ako je, a čo smie pretvoriť ten, kto zvyk preberie.' },
        question: { en: 'Which custom is yours to keep, and which would you be glad to see remade by the next person to carry it?', sk: 'Ktorý zvyk máte držať vy a ktorý by ste radi videli prerobený tým, kto zvyk prevezme po vás?' },
    },
    'change-and-steadiness/opposed:novelty-seeking': {
        title: { en: 'When the older generation is the one moving', sk: 'Keď sa pohne staršia generácia' },
        passage: {
            en: '{first} may be the one drawn to the new here: a different way of marking the holidays, a move, a life unlike the one before. If anyone keeps the old ways, it may be {second}, and the question of continuity can land on the younger of the two.\n\nThat can be a duty handed over without anyone asking. In the other direction, {first} can take the unease as reproach, a reluctance to let anyone in the family change. Both may be reacting to a role that has turned over. Keeping and changing can be two jobs the family needs, or a quarrel about who is right, and the same two people can make either of them.',
            sk: '{first} sa tu môže prikláňať k novému: k inému spôsobu sviatkov, k sťahovaniu, k životu nepodobnému doterajšiemu. Ak bude niekto držať staré zvyky, môže to byť {second}, a otázka kontinuity tak môže pripadnúť mladšej strane.\n\nMôže to byť povinnosť, ktorá pripadla bez opýtania. A naopak, {first} môže nepokoj druhej strany brať ako výčitku, ako neochotu dovoliť komukoľvek v rodine zmeniť sa. Každý možno reaguje na úlohu, ktorá sa obrátila. Uchovávanie starého a prinášanie nového môžu byť dve práce, ktoré rodina potrebuje, alebo spor o to, kto má pravdu, a tá istá dvojica z nich môže urobiť jedno aj druhé.',
        },
        aside: {
            en: '{first} may be the one drawn to the new, so the fixed point need not sit with the older of the two. {second} can then be left keeping the old ways, as a duty no one assigned.',
            sk: '{first} sa môže prikláňať k novému, takže pevný bod nemusí byť na staršej strane. {second} potom môže držať staré zvyky ako povinnosť, ktorú nikto nezveril.',
        },
        step: { en: 'Name keeping and changing as two jobs the family needs, and decide together who carries which for the next occasion.', sk: 'Pomenujte uchovávanie starého a prinášanie nového ako dve práce, ktoré rodina potrebuje, a spolu rozhodnite, kto ktorú preberie pri najbližšej príležitosti.' },
        question: { en: 'Which part of keeping the family steady has landed on one of you without being asked?', sk: 'Ktorá časť starostlivosti o stálosť rodiny pripadla jednému z vás bez opýtania?' },
    },
    'change-and-steadiness/oneSided:stability-seeking': {
        title: { en: 'The familiar wins without a contest', sk: 'Známe vyhrá bez súboja' },
        passage: {
            en: '{lean} tends to hold to what is familiar and {mid} sits nearer the middle, so the familiar is likely to win without a contest. {mid} may fit into the usual date, the usual table, the usual way of keeping in touch, and the tie can run smoothly.\n\nThe cost is that the person who could propose a change is also the one who accommodates. An arrangement {mid} has outgrown can stay in place because bending costs little in the moment, and because {lean} may have no sign that anything has been given up. If a change finally comes, it can sound like a sudden demand when it may be the sum of many small bends. Smooth accommodation can hide what it costs until the cost is named.',
            sk: '{lean} sa zvykne držať známeho a {mid} stojí bližšie k stredu, takže známe pravdepodobne vyhrá bez súboja. {mid} sa môže prispôsobiť zaužívanému termínu, zaužívanému stolu, zaužívanému spôsobu, ako sa držať v kontakte, a vzťah môže bežať hladko.\n\nCena je v tom, že ten, kto by mohol navrhnúť zmenu, je zároveň ten, kto sa prispôsobuje. Dohoda, z ktorej už {mid} vyrastá, môže zostať, lebo prispôsobiť sa v tej chvíli stojí málo a lebo {lean} možno nemá žiadny náznak, že sa druhá strana niečoho vzdáva. Ak zmena napokon príde, môže znieť ako náhla požiadavka, hoci môže ísť o súčet mnohých malých ústupkov. Hladké prispôsobovanie môže skrývať svoju cenu, kým sa nepomenuje.',
        },
        aside: {
            en: 'The familiar can win without a contest when {lean} holds to it and {mid} sits nearer the middle. An arrangement {mid} has outgrown may stay in place simply because bending costs little.',
            sk: 'Keď sa {lean} drží známeho a {mid} stojí bližšie k stredu, známe môže vyhrať bez súboja. Dohoda, z ktorej už {mid} vyrastá, môže zostať len preto, že prispôsobiť sa stojí málo.',
        },
        step: { en: 'Let the one who bends name one usual arrangement that has stopped suiting, and try another for a single occasion.', sk: 'Nech ten, kto sa prispôsobuje, pomenuje jednu zaužívanú dohodu, ktorá prestala sedieť, a pri jednej príležitosti vyskúšajte inú.' },
        question: { en: 'Which usual arrangement is kept up mostly because one of you finds it easy to bend?', sk: 'Ktorá zaužívaná dohoda sa drží hlavne preto, že sa jednému z vás ľahko prispôsobuje?' },
    },
    'change-and-steadiness/oneSided:novelty-seeking': {
        title: { en: 'The thing that was holding the rest up', sk: 'To, čo držalo zvyšok pokope' },
        passage: {
            en: '{lean} tends to bring the next idea, the next arrangement, the next way of doing the occasion. Without a strong pull of that kind, {mid} may go along, since each change costs little on its own. The pairing can keep the family from setting hard, and {mid} is unlikely to be the one who objects.\n\n{mid} may still need one thing that stays: the same place, the same day, the same dish. Because it is rarely the subject of discussion, it can go unnamed, and it can be changed along with everything else by someone who did not know it was holding the rest up. The loss can show later, as a reluctance with no stated cause.',
            sk: '{lean} zvykne prinášať ďalší nápad, ďalšie usporiadanie, ďalší spôsob, ako zariadiť príležitosť, a {mid} sa môže pridať, hoci nijako zvlášť netúži po novom, lebo každá zmena sama osebe stojí málo. Vďaka tejto dvojici rodina nemusí zatuhnúť a {mid} asi len zriedka namietne.\n\n{mid} však môže potrebovať jednu vec, ktorá ostane: to isté miesto, ten istý deň, to isté jedlo. Keďže sa o tom málokedy hovorí, môže to ostať nepomenované a niekto, kto nevie, že to drží zvyšok pokope, to môže zmeniť spolu so všetkým ostatným. Strata sa môže ukázať neskôr ako neochota bez vysloveného dôvodu.',
        },
        aside: {
            en: '{lean} may be drawn to change while {mid} goes along, as long as something familiar stays. That something is rarely named, and it can be changed with the rest by someone who did not know it was holding everything up.',
            sk: '{lean} sa môže nakláňať k novému a {mid} sa môže pridať, pokiaľ zostane aj niečo známe. To známe sa málokedy pomenuje a môže sa zmeniť spolu so zvyškom, hoci ten, kto to mení, nevie, že to drží všetko pokope.',
        },
        step: { en: 'Each name one thing that you would like to stay as it is, and treat it as fixed when plans are made.', sk: 'Každý z vás nech pomenuje jednu vec, ktorá má zostať po starom, a pri plánovaní počítajte s tým, že je pevná.' },
        question: { en: 'Which familiar thing would you most want to keep when everything else is open to change?', sk: 'Čo známe by ste si najviac chceli ponechať, keď je všetko ostatné otvorené zmene?' },
    },
    /* ------------------------------------------------------------------- taking-the-lead -- */
    'taking-the-lead/shared:assertive': {
        title: { en: 'Two plans arrive at once', sk: 'Dva plány naraz' },
        passage: {
            en: 'A trip to organise, a relative’s care to plan, a gathering to host: when {both} both step forward, two plans can arrive at once. Little is likely to wait for a volunteer, and a crisis is unlikely to find the pair without a proposal.\n\nThe cost is that the question under the logistics can become whose proposal it is. A disagreement about the venue or the date can carry a larger question underneath: who is entitled to decide in this family. Each may push harder, since giving way on the small thing might read as giving up the larger one. The decision itself may be the easy part. Until the two settle who decides what, each decision can also be a small vote on who leads.',
            sk: 'Treba zorganizovať výlet, naplánovať starostlivosť o príbuzného, usporiadať stretnutie: keď sa {both} chopia iniciatívy, môžu naraz prísť dva plány. Na dobrovoľníka asi nebude treba čakať a kríza ich sotva zastihne bez návrhu.\n\nPod logistikou sa potom môže skrývať otázka, čí návrh to je. Nezhoda o mieste alebo termíne môže niesť väčšiu otázku: kto má v tejto rodine právo rozhodovať. Každý môže tlačiť tvrdšie, lebo ústupok v malej veci by mohol vyzerať ako vzdanie sa tej väčšej. Samotné rozhodnutie môže byť tá ľahšia časť. Kým si neujasnia, kto o čom rozhoduje, môže byť každé rozhodnutie aj malým hlasovaním o tom, kto vedie.',
        },
        aside: {
            en: 'Little waits for a volunteer when {both} step forward, and two plans can arrive at once. A disagreement about a date or a venue can then carry a larger question underneath: whose call it is.',
            sk: 'Keď sa {both} chopia iniciatívy, na dobrovoľníka sa nečaká a naraz môžu prísť dva plány. Spor o dátum či miesto potom môže niesť väčšiu otázku: kto má posledné slovo.',
        },
        step: { en: 'Divide family decisions by area, so that each of you leads on some and defers on others, and agree the areas before the next one comes up.', sk: 'Rozdeľte si rodinné rozhodnutia podľa oblastí: v niektorých vedie jeden z vás, v iných druhý. Dohodnite sa na tom skôr, než príde ďalšie rozhodnutie.' },
        question: { en: 'Which kind of family decision would each of you gladly leave to the other, and which would you want to lead?', sk: 'Ktoré rodinné rozhodnutia by ste radi prenechali druhému a v ktorých chcete viesť vy?' },
    },
    'taking-the-lead/shared:receptive': {
        title: { en: 'Two who wait to be asked', sk: 'Každý čaká, že začne ten druhý' },
        passage: {
            en: '{both} tend to wait rather than take the first step. Each can take that as courtesy. It can also mean that contact depends on a first move neither supplies. The visit nobody proposes, the question nobody raises, the matter that is bothering one of them left unsaid: each can be waiting for the other to begin.\n\nThe decisions most likely to wait are the ones with real weight: a relative’s care, where a holiday is spent, who hosts what. If a tension sits between the two, waiting can leave it unspoken instead of settled, and the quiet can grow into a distance neither proposed.',
            sk: '{both} skôr čakajú, než by urobili prvý krok. Každý to môže brať ako zdvorilosť. Môže to však znamenať aj to, že kontakt závisí od prvého kroku, ktorý neurobí nikto z nich. Návšteva, ktorú nikto nenavrhne, otázka, ktorú nikto nevysloví, vec, ktorá jedného z nich trápi a zostáva nepovedaná: každý môže čakať, kým začne ten druhý.\n\nNajdlhšie môžu čakať rozhodnutia, na ktorých skutočne záleží: starostlivosť o príbuzného, kde sa strávia sviatky, kto bude čo hostiť. Ak je medzi nimi napätie, čakanie môže napätie nechať nevyslovené namiesto vyriešeného a ticho môže prerásť do odstupu, ktorý nikto nenavrhol.',
        },
        aside: {
            en: 'Visits, questions and whatever bothers either of the two can go unraised, since {both} tend to wait rather than take the first step, each expecting the other to begin.',
            sk: 'Návštevy, otázky aj to, čo trápi jedného či druhého, môžu zostať nevyslovené, lebo {both} skôr čakajú, než by urobili prvý krok, a každý nechá začiatok na druhom.',
        },
        step: { en: 'Take the first step on something small before it grows: a message, a question, a date for a visit.', sk: 'Urobte prvý krok pri niečom malom, skôr než to narastie: správa, otázka, termín návštevy.' },
        question: { en: 'What have you each been waiting for the other to raise?', sk: 'Na čo každý z vás čaká, že s tým príde ten druhý?' },
    },
    'taking-the-lead/opposed': {
        title: { en: '“Whatever suits you” is not yet an answer', sk: '„Ako chceš“ ešte nie je odpoveď' },
        passage: {
            en: '{p0} tends to take the first step: to set the date, make the booking, ask the question. {p1} may answer “whatever suits you”, which can be ease from one and no answer at all to the other. Each can be helping in the form that comes easily, and the pairing can run smoothly while the plans are small.\n\nThe difficulty is that {p0} may not be able to tell agreement from the absence of objection, and {p1} may find it hard to object to something already booked. Decisions that matter, a relative’s care, money, who hosts, can then move through the same channel, and the more {p0} carries, the less {p1} may have been asked. A plan can carry the name of whoever booked it and still lack the view of whoever was not asked.',
            sk: '{p0} zvykne urobiť prvý krok: určiť termín, urobiť rezerváciu, položiť otázku. {p1} môže odpovedať „ako chceš“, čo môže byť pre jedného pohoda a pre druhého žiadna odpoveď. Každý môže pomáhať tak, ako to ide ľahko, a dvojica môže fungovať hladko, kým sú plány malé.\n\nŤažkosť je v tom, že {p0} možno nerozozná súhlas od toho, že nikto nenamieta, a {p1} môže len ťažko namietať proti niečomu, čo je už zarezervované. Dôležité rozhodnutia, starostlivosť o príbuzného, peniaze, kto bude hostiť, potom môžu ísť tou istou cestou: čím viac toho nesie {p0}, tým menej otázok možno dostane {p1}. Plán môže niesť meno toho, kto rezerváciu urobí, a predsa postrádať názor toho, koho sa nikto nespýta.',
        },
        aside: {
            en: '{p0} is likely to take the first step and {p1} to say “whatever suits you”. {p0} may then not tell agreement from the absence of objection, and {p1} may find it hard to object to something already booked.',
            sk: '{p0} pravdepodobne urobí prvý krok a {p1} povie „ako chceš“. {p0} potom možno nerozozná súhlas od toho, že nikto nenamieta, a {p1} môže len ťažko namietať proti niečomu, čo je už zarezervované.',
        },
        step: { en: 'Before the next booking, ask for a view first and a choice second: “what would you pick, if it were only your call?”', sk: 'Pred ďalšou rezerváciou sa najprv pýtajte na názor a až potom na výber: „Čo by bola tvoja voľba, keby to bolo len na tebe?“' },
        question: { en: 'Which kind of plan would one of you shape differently if asked before it was booked?', sk: 'Pri akých plánoch by sa jednému z vás hodilo, keby sa na názor pýtalo ešte pred rezerváciou?' },
    },
    'taking-the-lead/opposed:assertive': {
        title: { en: 'An arrangement that outlasts its reason', sk: 'Dohoda, ktorá prežije svoj dôvod' },
        passage: {
            en: '{first} tends to arrange: the date, the table, what the family does next. {second} tends to go along, and the two can fit so well that the arrangement outlasts whatever reasons it began with. A role that suited an earlier situation can carry on simply because it works at the level of the booking.\n\nStrain can appear when {second} has something at stake: where to live, whom to invite, how to spend a holiday. {second} may meet it with the same easy yes, and {first} may have no signal that this one is different. Or a no can arrive for once and sound enormous, since the tie may have little practice at it. The tie is then testing whether a question can come before the arrangement, and a quiet no before a loud one.',
            sk: '{first} zvykne zariaďovať: termín, stôl, čo rodina urobí ďalej. {second} sa zvykne pridať a tieto dva sklony do seba môžu zapadať tak dobre, že dohoda môže prežiť dôvody, pre ktoré vznikla. Úloha, ktorá sa hodila k staršej situácii, môže pokračovať jednoducho preto, že pri rezerváciách všetko ide hladko.\n\nNapätie sa môže objaviť, keď má {second} v hre niečo vlastné: kde bývať, koho pozvať, ako stráviť sviatky. {second} môže odpovedať tým istým ľahkým áno a {first} nemusí mať ako spoznať, že tentoraz je to iné. Alebo raz príde nie a môže znieť obrovsky, lebo vzťah v tom nemusí mať cvik. Vzťah vtedy skúša, či otázka môže prísť pred dohodou a tiché nie pred hlasným.',
        },
        aside: {
            en: 'An arrangement can outlast its reason when {first} arranges and {second} goes along. Strain can appear when {second} has something at stake and the usual easy yes gives no sign of it.',
            sk: 'Dohoda môže prežiť svoj dôvod, keď {first} zariaďuje a {second} sa pridáva. Napätie môže nastať, keď má {second} v hre niečo vlastné a zvyčajné ľahké áno to nijako nenaznačí.',
        },
        step: { en: 'For one decision that is really the younger person’s own, let the older ask first and wait for an answer.', sk: 'Pri jednom rozhodnutí, ktoré je naozaj vecou mladšej generácie, nech sa staršia generácia najprv spýta a počká na odpoveď.' },
        question: { en: 'Which decision belongs to one of you and tends to be arranged by the other anyway?', sk: 'Ktoré rozhodnutie patrí jednému z vás, a predsa býva zvyčajne zariadené tým druhým?' },
    },
    'taking-the-lead/opposed:receptive': {
        title: { en: 'When the family order turns over', sk: 'Keď sa poradie v rodine obráti' },
        passage: {
            en: 'The family’s order can turn over without anyone announcing it. {second} may be the one who calls the doctor, books the table, says what happens next, and {first} may let that stand. While the tasks are practical, it can be a relief on both sides.\n\nThe reversal has a quiet edge. {first} may hold a view and keep it back, out of courtesy or because deferring now runs the other way, and {second} can take the lack of objection as agreement. A decision about a home, a routine or a way of being looked after can then be settled before anyone has asked the person it is about. The fit can be easy, and what it can quietly lose is the question that comes before the decision.',
            sk: 'Poradie v rodine sa môže obrátiť bez toho, aby to niekto oznámil. {second} môže byť tým, kto volá lekárovi, rezervuje stôl, hovorí, čo bude ďalej, a {first} to môže nechať tak. Kým ide o praktické veci, môže to byť úľava pre každého z nich.\n\nTáto zmena má aj tichú odvrátenú stránku. {first} si môže názor nechať pre seba, zo zdvorilosti alebo preto, že sa teraz ustupuje opačným smerom, a {second} môže chýbajúcu námietku vziať za súhlas. Rozhodnutie o domove, režime dňa alebo spôsobe starostlivosti sa tak môže uzavrieť skôr, než sa niekto spýta toho, koho sa týka. Dvojica do seba môže ľahko zapadať a pritom potichu stratiť otázku, ktorá patrí pred rozhodnutie.',
        },
        aside: {
            en: 'When {second} takes the lead and {first} lets it stand, the family’s order can turn over unannounced. That can be a relief while the tasks are practical, and it risks settling matters before the older of the two has been asked.',
            sk: 'Keď {second} preberie vedenie a {first} to nechá tak, poradie v rodine sa môže obrátiť bez ohlásenia. Kým ide o praktické veci, môže to byť úľava, no hrozí, že sa veci uzavrú skôr, než sa niekto spýta staršej generácie.',
        },
        step: { en: 'Where a decision concerns the older of you, ask first and wait for a full answer, however small the decision seems.', sk: 'Keď sa rozhodnutie týka staršej generácie, najprv sa spýtajte a počkajte na plnú odpoveď, nech sa rozhodnutie zdá akokoľvek malé.' },
        question: { en: 'What would you each want to be asked about before it is decided, whoever ends up doing the deciding?', sk: 'Na čo by ste každý chceli dostať otázku ešte pred rozhodnutím, nech už rozhoduje ktokoľvek?' },
    },
    'taking-the-lead/oneSided:assertive': {
        title: { en: 'The step taken before the other chooses', sk: 'Krok urobený skôr, než padne voľba' },
        passage: {
            en: '{lean} tends to step forward first, and {mid} has no settled preference for following or leading, which sounds like a balance. In practice the space tends to be filled while {mid} is still choosing which role to take: by the time a step up is possible, the call may have been made.\n\nThe result can be a pair in which one carries decisions that could have been shared, and the other has a capacity left unused. The lead is most likely to move when {lean} is tired or out of reach, and those moments can show what the arrangement was missing. What {mid} would have done can stay untested until {lean} is not there to go first.',
            sk: 'Prvý krok zvykne urobiť {lean} a {mid} nemá vyhranené, či radšej nasleduje, alebo vedie, čo znie ako rovnováha. V skutočnosti sa priestor zvykne zaplniť, kým si {mid} ešte vyberá, akú úlohu prevezme: kým sa dá ujať vedenia, rozhodnutie už mohlo padnúť.\n\nVýsledkom môže byť dvojica, v ktorej jeden nesie rozhodnutia, ktoré sa dali deliť, a druhý má schopnosť, ktorá zostáva nevyužitá. Vedenie sa najskôr presunie vtedy, keď {lean} nemá silu alebo nie je poruke, a práve také chvíle môžu ukázať, čo usporiadaniu chýbalo. Čo dokáže {mid}, môže zostať nevyskúšané, až kým {lean} nie je poruke a prvý krok zostane voľný.',
        },
        aside: {
            en: 'The space can be filled while {mid} is still choosing a role, since {lean} tends to step forward first. What {mid} would have done can stay untested until {lean} is out of reach.',
            sk: 'Priestor sa môže zaplniť, kým si {mid} ešte vyberá úlohu, lebo {lean} zvykne urobiť prvý krok. Čo dokáže {mid}, môže zostať nevyskúšané, kým {lean} nie je poruke.',
        },
        step: { en: 'On one decision, let the one who usually goes first wait, and see what the other proposes.', sk: 'Pri jednom rozhodnutí nech ten, kto zvyčajne ide prvý, počká, a pozrite sa, čo navrhne druhá strana.' },
        question: { en: 'What does the one who usually goes first fear will happen in the pause?', sk: 'Čoho sa obáva ten, kto zvyčajne ide prvý, že sa stane, kým čaká?' },
    },
    'taking-the-lead/oneSided:receptive': {
        title: { en: 'Waiting by choice or by default', sk: 'Čakanie z rozhodnutia alebo zo zvyku' },
        passage: {
            en: '{lean} tends to wait, and {mid}, in the middle on this, can take charge when something needs doing. The bargain can be that {mid} decides when the moment has come and {lean} learns the plan once it is announced.\n\nA view held back as a courtesy can be missing from the plan without anyone having left it out. Because {mid} can lead, a question may not seem necessary, and because {lean} tends to go along, the missing question may not register. Waiting by choice and waiting by default look the same from outside, and so does the plan that follows.',
            sk: '{lean} má sklon čakať a {mid} stojí v tomto niekde uprostred, takže vie prevziať vedenie, keď treba niečo urobiť. Výmena potom môže vyzerať tak, že {mid} rozhoduje, kedy nadišiel čas, a {lean} sa plán dozvie, až keď sa oznámi.\n\nNázor zadržaný zo zdvorilosti môže v pláne chýbať, hoci nikto nič nevynechal. Keďže {mid} vie viesť, otázka sa nemusí zdať potrebná, a keďže sa {lean} zvykne pridať, nikto si nemusí všimnúť, že otázka nezaznela. Čakanie z rozhodnutia a čakanie zo zvyku vyzerajú zvonka rovnako, a rovnako aj plán, ktorý z nich vzíde.',
        },
        aside: {
            en: 'Since {lean} tends to wait and {mid} can step in, {mid} is likely to set the timing. A view held back as a courtesy can then be missing from the plan.',
            sk: 'Keďže {lean} má sklon čakať a {mid} vie prevziať vedenie, čas pravdepodobne určuje {mid}. Názor zadržaný zo zdvorilosti potom môže v pláne chýbať.',
        },
        step: { en: 'Before the plan has a shape, ask the one who waits directly what would matter to that person.', sk: 'Skôr než plán dostane tvar, spýtajte sa priamo toho, kto čaká, na čom záleží.' },
        question: { en: 'What has kept that question from being asked until now: speed, habit, or a feeling that the answer is obvious?', sk: 'Čo doteraz bránilo tomu, aby zaznela priama otázka: tempo, zvyk, alebo dojem, že odpoveď je jasná?' },
    },
    /* ---------------------------------------------------------- practical-and-conceptual -- */
    'practical-and-conceptual/shared:practical': {
        title: { en: 'A tie run like a good errand list', sk: 'Vzťah ako dobre vedený zoznam vybavovania' },
        passage: {
            en: 'A list, a lift, a form, a repair: {both} tend to meet the family through what needs doing, so a family task can be split and done without much discussion. The tie is useful to both, and the usefulness is a real form of care.\n\nThe conversation that is not about a task is the one that can stay thin. A change in the family, a relative’s decline, a move, can arrive as a list of things to arrange. The question of what it means for the two can stay unasked, because the practical agenda is not finished. A visit can end with everything done and nothing said about how either is doing. A tie can be well run and still hold few conversations that lead nowhere in particular.',
            sk: 'Zoznam, odvoz, formulár, oprava: {both} sa s rodinou zvyknú stretávať cez to, čo treba urobiť, takže rodinné úlohy sa môžu bez veľkého rozprávania rozdeliť a vybaviť. Vzťah je užitočný pre každého z nich a tá užitočnosť je skutočným prejavom starostlivosti.\n\nMálo miesta môže zostať na rozhovor, ktorý nie je o úlohe. Zmena v rodine, ubúdajúce sily príbuzného, sťahovanie môžu prísť ako zoznam vecí na vybavenie. Otázka, čo to znamená pre nich, môže zostať nepoložená, lebo praktický program ešte nie je hotový. Návšteva môže skončiť tak, že je všetko vybavené a nikto nepovedal, ako sa komu darí. Vzťah môže byť dobre vedený, a predsa v ňom môže byť málo rozhovorov, ktoré nikam konkrétne nesmerujú.',
        },
        aside: {
            en: 'Tasks can be split and done without much talk when {both} meet the family through what needs doing. A visit can end with everything done and nothing said about how either is doing.',
            sk: 'Úlohy sa môžu rozdeliť a vybaviť bez veľa rečí, keď sa {both} s rodinou stretávajú cez to, čo treba urobiť. Návšteva môže skončiť tak, že je všetko vybavené a nikto nepovedal, ako sa komu darí.',
        },
        step: { en: 'Put one item on the next visit that is not a task, and give it some time before the list is opened.', sk: 'Zaraďte do najbližšej návštevy jednu položku, ktorá nie je úlohou, a vyhraďte tomu trochu času skôr, než sa otvorí zoznam.' },
        question: { en: 'What could the two of you talk about that would need no action afterward?', sk: 'O čom by ste sa mohli porozprávať tak, aby potom nebolo treba nič robiť?' },
    },
    'practical-and-conceptual/shared:conceptual': {
        title: { en: 'Talk so good it holds things in place', sk: 'Rozhovor taký dobrý, že sa nič nepohne' },
        passage: {
            en: '{both} tend to reach for meaning first: what a change says about the family, what a choice shows about values, where things are heading. A conversation between the two can run long and leave each understood, which is a real thing for a family to have.\n\nThe weakness is that understanding can feel like progress. A matter that needs a decision, a form, a date, a visit actually booked, can be talked about so well that it seems dealt with. The visit can keep being planned while the paperwork waits, and neither is likely to call the talk finished, since the talk is good. Talk this good can hold a family matter in place for as long as it goes on.',
            sk: '{both} sa zvyčajne najprv pýtajú na zmysel: čo zmena hovorí o rodine, čo voľba ukazuje o hodnotách, kam veci smerujú. Rozhovor medzi nimi môže trvať dlho a priniesť pocit, že si navzájom rozumejú, a to je pre rodinu veľa.\n\nSlabina je v tom, že porozumenie môže pôsobiť ako pokrok. Vec, ktorá si žiada rozhodnutie, formulár, termín, skutočne zarezervovanú návštevu, sa dá rozoberať tak dobre, že sa zdá vybavená. Návšteva sa môže stále len plánovať, kým papiere čakajú, a nikto z nich asi nepovie, že rozhovor sa skončil, veď je dobrý. Takýto rozhovor vie rodinnú vec držať na mieste, kým trvá.',
        },
        aside: {
            en: '{both} tend to reach for meaning first, and a long conversation can leave each understood. Because understanding can feel like progress, a matter that needs a date or a form can seem dealt with while it waits.',
            sk: '{both} sa zvyčajne najprv pýtajú na zmysel a dlhý rozhovor môže priniesť porozumenie. Keďže porozumenie môže pôsobiť ako pokrok, vec, ktorá potrebuje termín alebo formulár, sa môže zdať vybavená, hoci ešte čaká.',
        },
        step: { en: 'End a good conversation about meaning by naming one small thing that will be done, and who will do it.', sk: 'Dobrý rozhovor o zmysle zakončite jednou malou vecou, ktorá sa urobí, a menom toho, kto to urobí.' },
        question: { en: 'Which matter between you has been talked about thoroughly and still not acted on?', sk: 'Ktorú vec ste už dôkladne prebrali, a stále sa s tým nič neurobilo?' },
    },
    'practical-and-conceptual/opposed': {
        title: { en: 'Two first questions, no agreed order', sk: 'Dve prvé otázky bez dohodnutého poradia' },
        passage: {
            en: 'A change in the family can reach the two as different first questions. {p0} tends to ask what has to be done, what it costs and who will take it on. {p1} is more likely to ask what it means, what it says about the family, where it leads. Both questions are needed, and each tends to come just as the other is answering a different one.\n\n{p0} can take the larger question for delay, and {p1} can take the list for a way of not talking about it. The conversation can then run on two tracks that do not meet, and end with neither the arrangements nor the understanding complete. The difficulty is not that one question is shallow or the other slow. It is that nothing has settled which comes first.',
            sk: 'Zmena v rodine môže každého z dvojice priviesť k inej prvej otázke. {p0} sa zvykne pýtať, čo treba urobiť, koľko to bude stáť a kto sa toho ujme; {p1} sa skôr pýta, čo to znamená, čo to hovorí o rodine, kam to vedie. Potrebná je jedna aj druhá otázka a každá zvykne zaznieť práve vtedy, keď druhá strana odpovedá na inú.\n\n{p0} môže väčšiu otázku brať ako zdržiavanie a {p1} môže zoznam brať ako spôsob, ako sa o veci nerozprávať. Rozhovor potom môže ísť po dvoch koľajach, ktoré sa nestretnú, a skončiť bez hotových opatrení aj bez porozumenia. Problém nie je v tom, že jedna otázka je plytká alebo druhá pomalá. Je v tom, že nikto neurčil, ktorá ide prvá.',
        },
        aside: {
            en: 'Faced with a change in the family, {p0} tends to ask what has to be done and {p1} what it means. Each can take the other’s question for delay, and the talk can end with neither the arrangements nor the understanding complete.',
            sk: 'Pri zmene v rodine sa {p0} zvykne pýtať, čo treba urobiť, a {p1}, čo to znamená. Každý môže otázku toho druhého brať ako zdržiavanie a rozhovor môže skončiť bez hotových opatrení aj bez porozumenia.',
        },
        step: { en: 'Give the next change two turns: first what it means to each of you, then what has to be done, with a clear point where one hands over to the other.', sk: 'Dajte najbližšej zmene dve kolá: najprv čo znamená pre každého z vás, potom čo treba urobiť, a jasne určte, kde sa jedno kolo mení na druhé.' },
        question: { en: 'When a change comes, which question do you each ask first, and what answer would settle it?', sk: 'Keď príde zmena, akú otázku kladie každý z vás prvú a čo by tú otázku uzavrelo?' },
    },
    'practical-and-conceptual/opposed:practical': {
        title: { en: 'The practical question as an offer', sk: 'Praktická otázka ako ponuka' },
        passage: {
            en: '{second} tends to describe a decision in terms of what it means: where it is heading, why it matters. {first} is more likely to reply with the practical question: how it will be paid for, who will help, what needs doing first. Both replies are ways of taking the matter seriously, and each can sound as though the subject has been changed.\n\nIn a tie across generations the practical reply can carry extra weight, because it may also be how help is offered: the question about money can be the beginning of an offer. {second} can hear a doubt in it, and {first} can hear in the talk about meaning a plan with no floor under it. Each reply is an opening, and neither tends to sound like one to the other.',
            sk: '{second} zvykne opisovať rozhodnutie cez to, čo znamená: kam smeruje a prečo je dôležité. {first} skôr odpovie praktickou otázkou: z čoho sa to zaplatí, kto pomôže, čo treba urobiť najprv. Každá z týchto odpovedí je spôsob, ako vziať vec vážne, a každá môže druhému znieť, akoby sa zmenila téma.\n\nVo vzťahu medzi generáciami môže mať praktická odpoveď väčšiu váhu, lebo práve tak sa možno ponúka pomoc: otázka na peniaze môže byť začiatkom ponuky. {second} môže v takej otázke počuť pochybnosť a {first} môže v reči o zmysle počuť plán bez pevnej pôdy pod nohami. Každá odpoveď je otvorením, no druhej strane tak zvyčajne neznie.',
        },
        aside: {
            en: '{first} may answer a plan with a practical question about money, help or what comes first, and that question can be how help begins. {second} can hear it as doubt, and the talk of meaning can sound like a plan with no floor.',
            sk: '{first} môže na plán odpovedať praktickou otázkou na peniaze, pomoc alebo na to, čo je prvé, a práve takou otázkou sa môže začínať pomoc. {second} v takej otázke môže počuť pochybnosť a reč o zmysle môže zas znieť ako plán bez pevnej pôdy.',
        },
        step: { en: 'Let the practical question be asked after a sentence about what the decision means, and take it as the start of an offer.', sk: 'Nechajte praktickú otázku zaznieť až po vete o tom, čo rozhodnutie znamená, a berte takú otázku ako začiatok ponuky.' },
        question: { en: 'When a practical question is asked, is it a doubt or the start of help, and how would the other know?', sk: 'Keď padne praktická otázka, je to pochybnosť alebo začiatok pomoci, a podľa čoho to druhá strana spozná?' },
    },
    'practical-and-conceptual/opposed:conceptual': {
        title: { en: 'The task with a story attached', sk: 'Úloha s pribaleným príbehom' },
        passage: {
            en: '{first} tends to treat a family matter as a story with a shape: how it connects, what it says about the family, what it should mean for the next generation. {second} is more likely to treat it as a job with a list. A lift to an appointment, a form to fill in, the paperwork for a move: each can arrive with a long account attached.\n\n{first} can find the account to be the point, and {second}, trying to get the thing done, can find it a delay. With the efficient version, in turn, {first} can be left with help that has arrived and a family that has not been talked to. What passes between generations in such a moment is partly the task and partly the account. Cut the account and part of what was being handed on goes with it.',
            sk: '{first} zvykne brať rodinnú vec ako príbeh, ktorý má svoj tvar: ako súvisí s ostatným, čo hovorí o rodine, čo má znamenať pre ďalšiu generáciu. {second} berie tú istú vec skôr ako prácu so zoznamom. Odvoz k lekárovi, formulár na vyplnenie, papiere k sťahovaniu: ku každej z týchto vecí sa môže pripojiť dlhé rozprávanie.\n\n{first} môže rozprávanie vnímať ako to hlavné, kým sa {second} snaží vec dokončiť a môže v rozprávaní vidieť zdržanie. Pri rýchlej verzii zas môže {first} zostať s pomocou, ktorá prišla, a s rodinou, s ktorou sa nehovorilo. Medzi generáciami sa v takej chvíli odovzdáva sčasti úloha a sčasti rozprávanie. Keď rozprávanie odpadne, odíde aj časť z toho, čo sa odovzdávalo.',
        },
        aside: {
            en: 'On a family task, {first} tends to attach the story and {second} the list. Cut the story and part of what was being handed on goes with it; wait for it and the task waits too.',
            sk: 'Pri rodinnej úlohe {first} zvykne pridať príbeh a {second} zoznam. Keď príbeh odpadne, odíde aj časť z toho, čo sa odovzdávalo; keď sa na príbeh čaká, čaká aj úloha.',
        },
        step: { en: 'Do the task first, then set aside a stretch for the story, and decide together how long it can be.', sk: 'Najprv urobte úlohu, potom si nechajte chvíľu na príbeh a spolu rozhodnite, ako dlho smie trvať.' },
        question: { en: 'What does the story that comes with the task carry that the task itself does not?', sk: 'Čo nesie príbeh pribalený k úlohe, čo samotná úloha nenesie?' },
    },
    'practical-and-conceptual/oneSided:practical': {
        title: { en: 'The one who asks what it means', sk: 'Ten, kto sa pýta, čo to znamená' },
        passage: {
            en: '{lean} tends to go straight to what needs doing. {mid}, sitting between the two ways, is likely to be the one who asks the larger question: what this change means, how everyone is taking it. The practical side can be covered while the bigger side still gets asked.\n\nThat question may last only as long as {mid} keeps asking it. {lean} may answer it with a task, a call made or a lift offered, which {mid} can hear as no answer and which may be the answer {lean} has. If {mid} stops asking, the practical agenda may continue untroubled and the family may go through a change with nobody having said what it meant.',
            sk: '{lean} zvykne ísť rovno k tomu, čo treba urobiť, a {mid}, niekde medzi týmito dvoma prístupmi, pravdepodobne položí tú väčšiu otázku: čo táto zmena znamená, ako to všetci znášajú. Praktická stránka tak môže byť zabezpečená a na tú väčšiu sa pritom nezabudne.\n\nTáto otázka môže trvať len dovtedy, kým sa {mid} pýta. {lean} môže odpovedať úlohou, zavolaním alebo ponúknutým odvozom, čo {mid} môže počuť ako žiadnu odpoveď a čo môže byť práve tá odpoveď, ktorú {lean} má. Ak sa {mid} prestane pýtať, praktický program môže pokojne pokračovať a rodina môže prejsť zmenou bez toho, aby niekto povedal, čo znamenala.',
        },
        aside: {
            en: '{mid} is likely to ask the larger question when {lean} goes straight to what needs doing. That question may last only as long as {mid} keeps asking it.',
            sk: '{mid} pravdepodobne položí tú väčšiu otázku, keď {lean} ide rovno k tomu, čo treba urobiť. Otázka môže trvať len dovtedy, kým sa {mid} pýta.',
        },
        step: { en: 'Ask the larger question aloud, and invite the practical answer to be a task plus one sentence.', sk: 'Položte tú väčšiu otázku nahlas a poproste o praktickú odpoveď: úlohu a k tomu jednu vetu.' },
        question: { en: 'What does the practical answer to a question about meaning look like, and does the one asking recognise it?', sk: 'Ako vyzerá praktická odpoveď na otázku o zmysle a spozná ten, kto sa pýta, že je to odpoveď?' },
    },
    'practical-and-conceptual/oneSided:conceptual': {
        title: { en: 'One conversation, two jobs', sk: 'Jeden rozhovor, dve práce' },
        passage: {
            en: '{lean} tends to see the pattern and the direction of a family matter. {mid}, drawn neither way in particular, can stay with that and also bring it down to a date and a task, so the talk tends to end in something done. The arrangement can be smooth, and its weight can fall on one person.\n\n{mid} can end up as both listener and translator, and the idea may reach the world only because {mid} carries it there. {lean} may not see how much of the pattern was turned into effort, and {mid} may not say, since the talk seemed to go well. What looks like one conversation that led somewhere can be two jobs, and only one is visible.',
            sk: '{lean} zvykne v rodinnej veci vidieť súvislosti a smer. {mid} sa nekloní výrazne ani k jednému prístupu, a tak vie pri tom zostať a zároveň to pretaviť na termín a úlohu, takže rozhovor väčšinou skončí niečím urobeným. Usporiadanie môže byť hladké a celá váha môže ležať na jednom človeku.\n\n{mid} môže byť poslucháčom aj prekladateľom a myšlienka sa do sveta môže dostať len vďaka tomu, že {mid} myšlienku nesie ďalej. {lean} možno nevidí, koľko zo súvislostí sa premenilo na námahu, a {mid} to možno nepovie, lebo rozhovor vyzeral dobre. Čo vyzerá ako jeden rozhovor, ktorý niekam viedol, môžu byť dve práce, z ktorých vidno len jednu.',
        },
        aside: {
            en: 'Where {lean} sees the pattern, {mid} can both follow it and turn it into a date and a task. The talk can then end in something done, and {mid} may quietly be doing the listening and the translating.',
            sk: 'Tam, kde {lean} vidí súvislosti, ich {mid} vie sledovať aj premeniť na termín a úlohu. Rozhovor potom môže skončiť niečím urobeným a {mid} pri tom možno potichu počúva aj prekladá.',
        },
        step: { en: 'Once, let the one who has the idea also write down the next task that follows from it.', sk: 'Raz nech ten, kto má nápad, napíše aj ďalšiu úlohu, ktorá z nápadu vyplýva.' },
        question: { en: 'Whose effort turns an idea between you into something done, and has that been noticed?', sk: 'Čie úsilie premieňa nápad medzi vami na niečo urobené a je to vidieť?' },
    },
};
export default FAMILY_B;
