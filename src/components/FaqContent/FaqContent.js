import React from 'react';
import { displayLink } from 'helpers/config';
import { ContentText, TeamLunaText } from './FaqContentCss';
import UnorderedList from '../UnorderedList';

export const faqContent = [
  {
    title: 'Who made this awesome app?',
    contents: (
      <ContentText allowFontScaling={false}>The fine members of <TeamLunaText allowFontScaling={false} onPress={() => displayLink('http://teamluna.co/')}>Team Luna</TeamLunaText></ContentText>
    )
  }, {
    title: 'What does this app do?',
    contents: (
      <UnorderedList
        content={[
          'Find the closest station',
          'Get directions, on foot, or by car',
          'See when the next train is coming',
          'See the full rail schedule',
          'See these FAQs about riding the rail'
        ]}
      />
    )
  }, {
    title: 'What are the rail quick facts?',
    contents: (
      <UnorderedList
        content={[
          '7 days a week',
          '5:26 a.m. to 1:26 a.m.',
          'Every 10 minutes during weekday rush hour',
          'Every 15 minutes during non-peak hours',
          'Every 20 minutes during the day on weekends',
          'Every 30 minutes during late night hours on weekends',
          '15 stations',
          'Seven park and ride locations',
          'Connects I-485 at South Boulevard to Uptown Charlotte',
          '9.6 miles long'
        ]}
      />
    )
  }, {
    title: 'How much do tickets cost?',
    contents: (
      <UnorderedList
        content={[
          '$2.20 One Ride ($1.10 Seniors and Youths)',
          '$4.40 Round Trip ($2.20 Seniors and Youths)',
          '$6.60 Day Pass',
          '$22.00 Weekly Pass',
          '$88.00 Monthly Pass'
        ]}
      />
    )
  }, {
    title: 'What if I don’t buy a rail ticket?',
    contents: (
      <ContentText allowFontScaling={false}>You could end up with a $50 citation! Ouch. Just buy a ticket.</ContentText>
    )
  }, {
    title: 'Where do I buy rail tickets?',
    contents: (
      <ContentText allowFontScaling={false}>All stations have ticket vending machines (bilingual English and Spanish). Use cash, credit card, or debit card. You cannot buy tickets once on the rail. Buy ticket before boarding.</ContentText>
    )
  }, {
    title: 'Do the ticket machines take cash?',
    contents: (
      <ContentText allowFontScaling={false}>Yes. Bills and coins. $20 is largest bill accepted. No pennies.</ContentText>
    )
  }, {
    title: 'Do they take credit and debit cards?',
    contents: (
      <ContentText allowFontScaling={false}>Yes and yes</ContentText>
    )
  }, {
    title: 'What’s the schedule?',
    contents: (
      <ContentText allowFontScaling={false}>Tap the clock icon to view the full schedule. Weekdays, Saturdays, and Sundays have different schedules.</ContentText>
    )
  }, {
    title: 'Why is the schedule wrong, and train late?',
    contents: (
      <ContentText allowFontScaling={false}>The light rail usually follows the public schedule posted at stations and the Charlote Area Transit System (CATS) website: <TeamLunaText allowFontScaling={false} onPress={() => displayLink('http://charmeck.org/city/charlotte/cats/lynx/routes/Pages/RoutesSchedules.aspx')}>charmeck.org</TeamLunaText>. The actual schedule may be different due to special events, holidays, passenger volume, maintenance, etc.</ContentText>
    )
  }, {
    title: 'Where do I park?',
    contents: (
      <ContentText allowFontScaling={false}>Tap the info icon to see if parking is available at a certain station. Many stations have their own parking lots. Others may have public parking nearby.</ContentText>
    )
  }, {
    title: 'How do I safely ride the light rail?',
    contents: (
      <UnorderedList
        content={[
          'Audio broadcasts announce when the train is coming',
          'Stand 3 feet away from the tactile edge of the platform',
          'Don’t flag down the train. It stops at each station.',
          'Board when the train comes to a complete stop and doors are fully open',
          'Stay seated or hold onto a handrail',
          'Do not lean on the doors',
          'Have your ticket handy for the ticket inspectors',
          'Keep all your belongings close',
          'Report anything suspicious',
          'When the train stops, if the doors do not open, push the flashing button in the center of the doors',
          'Move away from the train after you exit',
          'Be careful crossing streets and platforms near the train stations. Use sidewalks and crosswalks.'
        ]}
      />
    )
  }, {
    title: 'What if I see something suspicious?',
    contents: (
      <ContentText allowFontScaling={false}>Report anything suspicious to the police!</ContentText>
    )
  }, {
    title: 'Where can I learn more?',
    contents: (
      <ContentText allowFontScaling={false}>
        <TeamLunaText allowFontScaling={false} onPress={() => displayLink('http://www.lynxcharlotte.com/')}>http://www.lynxcharlotte.com/</TeamLunaText>
      </ContentText>
    )
  }, {
    title: 'Where can I submit feedback or get help?',
    contents: (
      <ContentText allowFontScaling={false}>
        <TeamLunaText allowFontScaling={false} onPress={() => displayLink('http://charlottelightrailapp.com/support/index.html')}>Charlotte Light Rail App Support</TeamLunaText>
      </ContentText>
    )
  }
];
