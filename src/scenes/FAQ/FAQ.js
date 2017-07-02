import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { faqContent } from 'components/FaqContent';
import { COLORS } from 'assets/styles/constants';

export default class Faq extends React.Component {

  constructor(props) {
    super(props);
    // Set initial animation values for each accordion section...
    const arrowAnimationValues = {};
    // const faqSections = faqContent(styles);
    faqContent.forEach((sec, index) => {
      arrowAnimationValues[`arrowBounce${index}`] = new Animated.Value(45);
    });
    arrowAnimationValues.arrowBounce0 = new Animated.Value(135);
    // and set initial state.
    this.state = {
      ...arrowAnimationValues,
      openIndex: 0,
    };
  }

  renderHeader = (section, index) => {
    const bounce = this.state[`arrowBounce${index}`];
    return (
      <AccordionHeaderView>
        <View style={{ flex: 1 }}>
          <BoldText allowFontScaling={false}>{section.title}</BoldText>
        </View>
        <AnimatedArrowsView style={{ bounce }} />
      </AccordionHeaderView>
    );
  }

  renderContent = section => (
    <View style={styles.accordionContent}>
      {section.contents}
    </View>
  );

  toggleArrow = (openIndex) => {
    const prevOpenIndex = this.state.openIndex;
    // Change previously open toggle arrow back to point right (whether opening new toggle or closing)
    Animated.spring(this.state[`arrowBounce${prevOpenIndex}`], { toValue: 45 }).start();
    if (openIndex !== false) { // If user is not closing a toggle
      // Change newly open toggle arrow to point down
      Animated.spring(this.state[`arrowBounce${openIndex}`], { toValue: 135 }).start();
      this.setState({ openIndex }); // Set our openIndex
    }
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.accordionWrapper}>
            <Accordion
              initiallyActiveSection={0}
              onChange={this.toggleArrow}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              sections={faqContent}
              underlayColor={COLORS.backgroundColorTrans}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
