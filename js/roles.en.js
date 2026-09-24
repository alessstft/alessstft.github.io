/* ============================================================
   ПРОФЕССИИ — АНГЛИЙСКАЯ ВЕРСИЯ.
   Порядок и количество такие же, как в roles.js.
   Фото и его положение (id, sz, pos) берутся из roles.js — здесь только тексты.
   ============================================================ */
const ROLES_EN = [
  {
    label:'Developer', sub:'project manager',
    meta:'path: developer → team lead → project manager (PM)', title:'Development & project management',
    lead:'I grew from developer to project manager. My specialty is frontend, but on some projects I owned the backend and the full development cycle. Products we launched are running in several companies.',
    branches:[
      {name:'Project manager', html:()=>'<p>Today I make sure a project reaches its goal — on time and in the shape the client actually needs.</p>'+li(['Translate business needs into tasks the team understands — and back','Plan sprints and track product growth','Keep the client and the developers in sync','Check quality before every release'])},
      {name:'Team lead', html:()=>'<p>I have led — and still lead — a development team, from task planning to launch.</p>'+li(['Assigned tasks based on each person’s strengths','Reviewed code and helped with the hardest problems','Made technical decisions together with the team','Helped newcomers get up to speed'])},
      {name:'Developer', html:()=>'<p>I’m growing as a frontend developer: I love interfaces that don’t just work but feel good to use. On some projects I handled the server side or worked full-stack.</p><div class="chips">'+CONFIG.stack.map(s=>'<span class="chip">'+s+'</span>').join('')+'</div>'},
      {name:'Projects', html:()=>'<div class="projects">'+CONFIG.projects.map(p=>{const e=p.en||p; return '<div class="project"><h4>'+e.title+'</h4><p class="who">'+e.role+'</p><p>'+e.desc+'</p>'+(p.url?'<a class="gh" href="'+p.url+'" target="_blank" rel="noopener">Open project presentation</a>':'')+'</div>';}).join('')+'</div>'}
    ]
  },
  {
    label:'Deputy manager', sub:'people & processes',
    meta:'the manager’s right hand', title:'Deputy manager',
    lead:'Made sure the team worked as one: hired people, assigned tasks, resolved conflicts and worked with the database.',
    branches:[
      {name:'Team', html:()=>'<p>Built the team and kept it growing.</p>'+li(['Ran job interviews','Assessed candidates not only on skills but on team fit','Onboarded new hires'])},
      {name:'Conflicts', html:()=>'<p>When tension built up between people, I was the one who listened to both sides.</p>'+li(['Resolved conflicts within the team and with clients','Looked for solutions that worked for everyone','Kept small disputes from growing into big ones'])},
      {name:'Tasks & deadlines', html:()=>li(['Distributed tasks among the staff','Kept track of deadlines','Spotted where work stalled and helped get it moving'])}
    ]
  },
  {
    label:'Teacher', sub:'coding for kids',
    meta:'kids and teenagers', title:'Programming teacher',
    lead:'Taught kids and teens to code — so that their first lines of code turned into games and websites, not boring drills.',
    branches:[
      {name:'Courses', html:()=>li(['Introduction to programming','Game development basics','Python basics','HTML, CSS and JavaScript — first websites'])},
      {name:'Students', html:()=>'<p>With kids, other things matter: explain simply, celebrate small wins and don’t let them quit at the first error. I adapted my teaching to each student’s age.</p>'},
      {name:'Parents', html:()=>'<p>I kept in regular touch with parents: shared progress, explained what we were working on and answered their questions. A parent who understands what happens in class is a teacher’s best ally.</p>'}
    ]
  },
  {
    label:'Coffee shop marketer', sub:'revenue ×2',
    meta:'social media, promos, analytics', title:'Coffee shop marketer',
    lead:'Grew the coffee shop on social media and worked out how to bring guests in — and make them come back.',
    branches:[
      {name:'Result', html:()=>'<p class="result">×2</p><p>The coffee shop’s revenue doubled during my time there.</p>'},
      {name:'Social media', html:()=>li(['Ran the coffee shop’s social media','Built strategies and analyzed the results'])},
      {name:'Promos & posters', html:()=>li(['Came up with and launched promotions','Created posters and social media visuals with Figma and AI tools'])},
      {name:'Analytics', html:()=>'<p>Tracked what worked: which promos paid off, which posts brought in guests, and on which days and hours sales dipped.</p>'},
      {name:'Certificates', html:()=>'<p>I keep learning marketing and online sales.</p>'+certs(true)}
    ]
  },
  {
    label:'Administrator', sub:'my first real job, at 17',
    meta:'where it all began', title:'Kids’ shooting gallery administrator',
    lead:'My first job, at seventeen: administrator at a shooting gallery. I worked with children and their parents.',
    branches:[
      {name:'Working with kids', html:()=>'<p>Explained the rules, taught kids to shoot and kept things in order. That’s where I realized I can find common ground with all kinds of people.</p>'},
      {name:'Order', html:()=>li(['Kept visitors safe','Welcomed guests and ran the till','Kept the venue tidy and under control'])}
    ]
  }
];
