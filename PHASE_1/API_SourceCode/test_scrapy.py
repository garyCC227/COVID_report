import pytest
import sys
import os
import json
from langdetect import detect
from pathlib import Path


sys.path.append(os.path.dirname(os.path.abspath('__file__')))
from Scrapy.last_activity import ActivityPost
from update_articles import update_post
from Scrapy.filter import Filter

@pytest.fixture
def AP():
  '''
  consistent html flu racker posts file to do test
  1. 5 posts
  '''
  file = open('scrapy_test.html', 'r')
  content = file.read()
  return ActivityPost(content, 1584797659)

# ensure we play with a valid html


def test_empty_last_activity():
  empty = ActivityPost("", 0)
  assert empty.valid_html == False


def test_last_activity_basic_attrs(AP):
  assert AP.valid_html == True
  assert AP.num_posts == 5


def test_LA_get_posts(AP):
  posts = list(AP.get_posts())
  assert len(posts) == 5
  correct = {
      '839519': ['1584789301','https://www.ncbi.nlm.nih.gov/pubmed/32192233#' ],
      '839545': ['1584791601', 'https://afludiary.blogspot.com/2020/03/the-most-predicted-global-crisis-of.html'],
      '839566': ['1584797659', 'https://www.noticiasaominuto.com/mundo/1438982/cabo-verde-confirma-mais-dois-casos-da-covid-19-na-ilha-da-boa-vista'],
      '839549': ['1584792324', 'https://www.towleroad.com/2020/03/medical-worker-covid-19/'],
      '839520': ['1584789354', 'https://www.ncbi.nlm.nih.gov/pubmed/32191830#']
  }

  for post in posts:
    nodeid = post['nodeid']
    assert nodeid in correct.keys()
    assert post['datestamp'] == correct[nodeid][0]
    assert post['url'] == correct[nodeid][1]


def test_update_post(AP):
  with open(Path('Scrapy/content.json'), 'r') as f:
    data = json.load(f)

  last_timestamp = data['lastDatestamp']
  #check for 5 new posts
  five_new_posts = list(AP.get_posts())
  sorted_posts = sorted(five_new_posts, key=lambda x:x['datestamp'], reverse=True)
  for post in five_new_posts:
    post['datestamp'] = str(int(last_timestamp) + 100)
  assert 5 == update_post(sorted_posts, AP)
  with open('./Scrapy/posts.json', 'r') as f:
    data = json.load(f)

  # knew 5 posts is inserted
  assert data['lastDatestamp'] == 1584797659
  assert data['count'] == 5
  assert len(data['posts']) == 5
  assert data['posts'] == sorted_posts

  # #check 1 old + 1 new posts
  old_post = five_new_posts[0]
  old_post['datestamp'] = '1580000000'

  assert 1 == update_post([five_new_posts[2], old_post], AP)
 
  with open('./Scrapy/posts.json', 'r') as f:
    data = json.load(f)

  # knew 1 posts is inserted
  assert data['count'] == 1
  assert len(data['posts']) == 1

  #check if 2 new + 3 old posts
  count = 0
  for post in five_new_posts:
    post['datestamp'] = '1580000000'
    count += 1
    if count == 2:
      break
  
  two_old_posts = sorted(five_new_posts, key=lambda x:x['datestamp'], reverse=True)
  assert 3 == update_post(two_old_posts, AP)
  with open('./Scrapy/posts.json', 'r') as f:
    data = json.load(f)

  # knew 3 posts is inserted
  assert data['count'] == 3
  assert len(data['posts']) == 3
  assert data['posts'] == two_old_posts[0:3]


  # check if AP give a empty list
  assert update_post([], AP) == 0

'''
This test function is a combination of 
  - scrapping website
  - filter a valid url
'''
def test_get_source_text_for_onepost(AP):
  # Valid url
  url = 'https://www.towleroad.com/2020/03/medical-worker-covid-19/'
  correct_title = 'Medical Worker: Seeing Terrifying Lung Failure Even in Young Patients Completely Changed My Perspective on COVID-19'
  correct_content = 'Towleroad Gay NewsGay Blog Towleroad: More than gay news | gay menMarch 21, 2020 by Lizzie Presser, ProPublica Leave a CommentProPublica is a Pulitzer Prize-winning investigative newsroom.  Sign up for The Big Story newsletter to receive stories like this one in your inbox.As of Friday, Louisiana was reporting 479 confirmed cases of COVID-19, one of the highest numbers in the country. Ten people had died. The majority of cases are in New Orleans, which now has one confirmed case for every 1,000 residents. New Orleans had held Mardi Gras celebrations just two weeks before its first patient, with more than a million revelers on its streets.I spoke to a respiratory therapist there, whose job is to ensure that patients are breathing well. He works in a medium-sized city hospital’s intensive care unit. (We are withholding his name and employer, as he fears retaliation.) Before the virus came to New Orleans, his days were pretty relaxed, nebulizing patients with asthma, adjusting oxygen tubes that run through the nose or, in the most severe cases, setting up and managing ventilators. His patients were usually older, with chronic health conditions and bad lungs.Since last week, he’s been running ventilators for the sickest COVID-19 patients. Many are relatively young, in their 40s and 50s, and have minimal, if any, preexisting conditions in their charts. He is overwhelmed, stunned by the manifestation of the infection, both its speed and intensity. The ICU where he works has essentially become a coronavirus unit. He estimates that his hospital has admitted dozens of confirmed or presumptive coronavirus patients. About a third have ended up on ventilators.His hospital had not prepared for this volume before the virus first appeared. One physician had tried to raise alarms, asking about negative pressure rooms and ventilators. Most staff concluded that he was overreacting. “They thought the media was overhyping it,” the respiratory therapist told me. “In retrospect, he was right to be concerned.”He spoke to me by phone on Thursday about why, exactly, he has been so alarmed. His account has been condensed and edited for clarity.“Reading about it in the news, I knew it was going to be bad, but we deal with the flu every year so I was thinking: Well, it’s probably not that much worse than the flu. But seeing patients with COVID-19 completely changed my perspective, and it’s a lot more frightening.”“I have patients in their early 40s and, yeah, I was kind of shocked. I’m seeing people who look relatively healthy with a minimal health history, and they are completely wiped out, like they’ve been hit by a truck. This is knocking out what should be perfectly fit, healthy people. Patients will be on minimal support, on a little bit of oxygen, and then all of a sudden, they go into complete respiratory arrest, shut down and can’t breathe at all.”“We have an observation unit in the hospital, and we have been admitting patients that had tested positive or are presumptive positive — these are patients that had been in contact with people who were positive. We go and check vitals on patients every four hours, and some are on a continuous cardiac monitor, so we see that their heart rate has a sudden increase or decrease, or someone goes in and sees that the patient is struggling to breathe or is unresponsive. That seems to be what happens to a lot of these patients: They suddenly become unresponsive or go into respiratory failure.”“It’s called acute respiratory distress syndrome, ARDS. That means the lungs are filled with fluid. And it’s notable for the way the X-ray looks: The entire lung is basically whited out from fluid. Patients with ARDS are extremely difficult to oxygenate. It has a really high mortality rate, about 40%. The way to manage it is to put a patient on a ventilator. The additional pressure helps the oxygen go into the bloodstream.“Normally, ARDS is something that happens over time as the lungs get more and more inflamed. But with this virus, it seems like it happens overnight. When you’re healthy, your lung is made up of little balloons. Like a tree is made out of a bunch of little leaves, the lung is made of little air sacs that are called the alveoli. When you breathe in, all of those little air sacs inflate, and they have capillaries in the walls, little blood vessels. The oxygen gets from the air in the lung into the blood so it can be carried around the body.“Typically with ARDS, the lungs become inflamed. It’s like inflammation anywhere: If you have a burn on your arm, the skin around it turns red from additional blood flow. The body is sending it additional nutrients to heal. The problem is, when that happens in your lungs, fluid and extra blood starts going to the lungs. Viruses can injure cells in the walls of the alveoli, so the fluid leaks into the alveoli. A telltale sign of ARDS in an X-ray is what’s called ‘ground glass opacity,’ like an old-fashioned ground glass privacy window in a shower. And lungs look that way because fluid is white on an X-ray, so the lung looks like white ground glass, or sometimes pure white, because the lung is filled with so much fluid, displacing where the air would normally be.”“With our coronavirus patients, once they’re on ventilators, most need about the highest settings that we can do. About 90% oxygen, and 16 of PEEP, positive end-expiratory pressure, which keeps the lung inflated. This is nearly as high as I’ve ever seen. The level we’re at means we are running out of options.“In my experience, this severity of ARDS is usually more typical of someone who has a near drowning experience — they have a bunch of dirty water in their lungs — or people who inhale caustic gas. Especially for it to have such an acute onset like that. I’ve never seen a microorganism or an infectious process cause such acute damage to the lungs so rapidly. That was what really shocked me.”“It first struck me how different it was when I saw my first coronavirus patient go bad. I was like, Holy shit, this is not the flu. Watching this relatively young guy, gasping for air, pink frothy secretions coming out of his tube and out of his mouth. The ventilator should have been doing the work of breathing but he was still gasping for air, moving his mouth, moving his body, struggling. We had to restrain him. With all the coronavirus patients, we’ve had to restrain them. They really hyperventilate, really struggle to breathe. When you’re in that mindstate of struggling to breathe and delirious with fever, you don’t know when someone is trying to help you, so you’ll try to rip the breathing tube out because you feel it is choking you, but you are drowning.“When someone has an infection, I’m used to seeing the normal colors you’d associate with it: greens and yellows. The coronavirus patients with ARDS have been having a lot of secretions that are actually pink because they’re filled with blood cells that are leaking into their airways. They are essentially drowning in their own blood and fluids because their lungs are so full. So we’re constantly having to suction out the secretions every time we go into their rooms.”“Before this, we were all joking. It’s grim humor. If you are exposed to the virus and test positive and go on quarantine, you get paid. We were all joking: I want to get the coronavirus because then I get a paid vacation from work. And once I saw these patients with it, I was like, Holy shit, I do not want to catch this and I don’t want anyone I know to catch this.“I worked a long stretch of days last week, and I watched it go from this novelty to a serious issue. We had one or two patients at our hospital, and then five to 10 patients, and then 20 patients. Every day, the intensity kept ratcheting up. More patients, and the patients themselves are starting to get sicker and sicker. When it first started, we all had tons of equipment, tons of supplies, and as we started getting more patients, we started to run out. They had to ration supplies. At first we were trying to use one mask per patient. Then it was just: You get one mask for positive patients, another mask for everyone else. And now it’s just: You get one mask.“I work 12-hour shifts. Right now, we are running about four times the number of ventilators than we normally have going. We have such a large volume of patients, but it’s really hard to find enough people to fill all the shifts. The caregiver-to-patient ratio has gone down, and you can’t spend as much time with each patient, you can’t adjust the vent settings as aggressively because you’re not going into the room as often. And we’re also trying to avoid going into the room as much as possible to reduce infection risk of staff and to conserve personal protective equipment.”“But we are trying to wean down the settings on the ventilator as much as possible, because you don’t want someone to be on the ventilator longer than they need to be. Your risk of mortality increases every day that you spend on a ventilator. The high pressures from high vent settings is pushing air into the lung and can overinflate those little balloons. They can pop. It can destroy the alveoli. Even if you survive ARDS, although some damage can heal, it can also do long-lasting damage to the lungs. They can get filled up with scar tissue. ARDS can lead to cognitive decline. Some people’s muscles waste away, and it takes them a long time to recover once they come off the ventilator.“There is a very real possibility that we might run out of ICU beds and at that point I don’t know what happens if patients get sick and need to be intubated and put on a ventilator. Is that person going to die because we don’t have the equipment to keep them alive? What if it goes on for months and dozens of people die because we don’t have the ventilators?“Hopefully we don’t get there, but if you only have one ventilator, and you have two patients, you’re going to have to go with the one who has a higher likelihood of surviving. And I’m afraid we’ll get to that point. I’ve heard that’s happening in Italy.”Filed under:Filed Under: towleroad Tagged With: coronavirus, HealthCopyright © 2020 · News Pro on Genesis Framework · WordPress · Log in'
  title, content = ActivityPost.get_source_text_for_onepost(url)

  assert correct_content == content
  assert correct_title == title


#Test filter with invalid html page
def test_filter_get_text_byp_invalid_url():
  #cannot access url
  file = 'access_denied.html'
  f = Filter(file)
  title, content = f.get_source_text_by_p()
  # special test only for flu-trackers, since it often scrape 'ncbi' website
  assert "NCBIErrorYour access to the NCBI website" in content

  #scrape non-english url
  file = 'non_english.html'
  f = Filter(file)
  title, content = f.get_source_text_by_p()
  assert detect(content) != "en"
  assert detect(title) != "en"