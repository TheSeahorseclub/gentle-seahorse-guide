export interface ContentSection {
  label: string;
  points: string[];
}

export interface WeekContent {
  week: number;
  title: string;
  gentleFocus: string;
  iconName: 'heart' | 'message-circle' | 'hand' | 'moon' | 'sparkles' | 'eye' | 'baby' | 'brain' | 'smile' | 'music' | 'move' | 'sun';
  introduction: string;
  sections: ContentSection[];
  neurodevelopmentalNote: string;
  weeklyCta?: string;
  extraGuidance?: { title: string; points: string[] };
  isStartingPoint?: boolean;
}

export interface MonthContent {
  month: number;
  title: string;
  subtitle: string;
  weeks: WeekContent[];
  closingNote?: string;
}

export const allMonths: MonthContent[] = [
  // ─── MONTH 1 ───
  {
    month: 1,
    title: 'Month 1',
    subtitle: 'Adapting to the world',
    weeks: [
      {
        week: 1,
        title: 'Safety, Sleep, and First Connections',
        gentleFocus: 'Respecting natural rhythms and building early connection',
        iconName: 'heart',
        introduction:
          "During this first week, your baby will be very sleepy and is adapting to life outside the womb. At this stage, the nervous system is still highly immature, and regulation depends almost entirely on the caregiver.\n\nFocus on respecting your baby's natural rhythms. There is no need to overstimulate.",
        sections: [
          {
            label: 'Cognitive & Emotional Development',
            points: [
              "When interacting, keep your face approximately 30 cm from your baby's face. Their vision is still blurred, and this distance supports visual comfort.",
              'Make eye contact when possible and smile gently.',
              'Speak slowly, calmly, and rhythmically.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'No structured motor activities are required this week. Gentle handling, holding, and skin-to-skin contact are sufficient.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Research in early social neuroscience shows that face-to-face interaction activates early social brain networks, supporting emotional security and future communication.',
        isStartingPoint: true,
      },
      {
        week: 2,
        title: 'The Human Face as the First Toy',
        gentleFocus: 'Facial expression and melodic interaction',
        iconName: 'message-circle',
        introduction:
          'Your baby\'s favourite "toy" is your face. This week is about playful, gentle interaction through expression and voice.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Raise your eyebrows, open and close your mouth, show your tongue, blink slowly.',
              'Speak using a slightly exaggerated, melodic tone (often called "parentese").',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Studies show that babies are biologically primed to respond to facial expressions and rhythmic speech, which supports early language and social development.',
      },
      {
        week: 3,
        title: 'Patterns, Voice, and Familiarity',
        gentleFocus: 'Repetition, language exposure, and early motor exploration',
        iconName: 'hand',
        introduction:
          'Your baby is beginning to notice patterns in sound and interaction. Familiar voices and consistent words help build a sense of safety.',
        sections: [
          {
            label: 'Cognitive & Language Development',
            points: [
              'Choose a small group of simple words and repeat them consistently throughout the week.',
              'Read aloud stories you used during pregnancy — familiarity supports neural recognition and emotional safety.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'Introduce tummy time for short periods, always supervised.',
              "Place your baby on their tummy to encourage head lifting and upper-body strength.",
            ],
          },
        ],
        neurodevelopmentalNote:
          'Neuroscience research shows that repetition strengthens neural pathways, especially in early language networks.',
      },
      {
        week: 4,
        title: 'Hands, Discovery, and First Rituals',
        gentleFocus: 'Hand discovery, early grasping, and predictable routines',
        iconName: 'moon',
        introduction:
          "This is a period of hand discovery. Your baby is also ready for the gentle introduction of bedtime rituals that support their developing nervous system.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Offer rattles or soft objects that can safely be brought to the mouth — always prefer items that are petrol-free.',
              'Encourage reaching and grasping movements.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'Continue facial games and allow pauses so your baby can respond.',
              'Begin introducing a simple baby bedtime story routine.',
            ],
          },
          {
            label: 'Extra Guidance – Sleep Ritual',
            points: [
              'Bath at the same time.',
              'Gentle massage (hands and feet).',
              'Dim lights.',
              'Calm voice or soft music.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Consistent rituals help regulate stress hormones and support sleep-wake cycles, according to infant sleep research.',
      },
    ],
  },

  // ─── MONTH 2 ───
  {
    month: 2,
    title: 'Month 2',
    subtitle: 'Sensory integration and emotional bonding',
    weeks: [
      {
        week: 1,
        title: 'Touch and Body Awareness',
        gentleFocus: 'Tactile exploration and the transition to intentional holding',
        iconName: 'hand',
        introduction:
          'Touch is the first sense to develop in the womb and remains central now.',
        sections: [
          {
            label: 'Tactile Development',
            points: [
              'Encourage play with different textures using hands and feet.',
              'Use soft fabrics, crochet items, or organic natural materials.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'This supports the transition from involuntary grasping to intentional holding, a key sensorimotor milestone.',
      },
      {
        week: 2,
        title: 'Vision, Voice, and Emotional Safety',
        gentleFocus: 'Visual tracking, affirming language, and emotional tone',
        iconName: 'eye',
        introduction:
          "Your baby's visual attention is growing. This week focuses on tracking, voice, and emotional safety.",
        sections: [
          {
            label: 'Attention Test',
            points: [
              "Move a handheld toy slowly from side to side at around 30 cm from your baby's face.",
              'Observe whether your baby follows the movement with their eyes.',
              "If the baby doesn't follow it — let your doctor know at the next consultation.",
              'The expected attention span at this stage is around 30 seconds.',
            ],
          },
          {
            label: 'Emotional Development',
            points: [
              'Use positive, affirming language.',
              'Speak as if your baby understands emotional meaning.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Attachment research consistently shows that emotional tone matters more than words in early development.',
      },
      {
        week: 3,
        title: 'Cause, Effect, and Curiosity',
        gentleFocus: 'Early cognitive connections and continued motor strengthening',
        iconName: 'brain',
        introduction:
          'Your baby is beginning to notice that actions lead to outcomes.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Use toys that make sounds when moved.',
              'Allow your baby to explore safely with their mouth and hands.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'Continue tummy time to strengthen muscles needed for sitting and crawling.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Cause-and-effect understanding is one of the earliest forms of logical thinking and supports future problem-solving skills.',
      },
      {
        week: 4,
        title: 'Autonomy and Gentle Exploration',
        gentleFocus: 'Independent play, early memory, and body awareness',
        iconName: 'sparkles',
        introduction:
          'This week gently introduces brief moments of independence, always with you nearby.',
        sections: [
          {
            label: 'Cognitive & Emotional Development',
            points: [
              'Allow brief moments of independent play, with you nearby.',
              'This supports early autonomy and confidence.',
            ],
          },
          {
            label: 'Extra Activity',
            points: [
              'Play simple games like covering your face and revealing it again. This supports early memory and body awareness.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Brief, supported independence helps build early self-regulation and a secure base for exploration.',
      },
    ],
  },

  // ─── MONTH 3 ───
  {
    month: 3,
    title: 'Month 3',
    subtitle: 'Movement, communication, and social interest',
    weeks: [
      {
        week: 1,
        title: 'Integration and Expression',
        gentleFocus: 'Alertness, curiosity, and social engagement',
        iconName: 'smile',
        introduction:
          'Your baby is now more alert, curious, and socially engaged.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Offer soft books with simple images.',
              'Continue using repeated words to strengthen phonetic recognition.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'Your baby may begin rolling or preparing to roll.',
              'Encourage free movement on the floor in a safe environment.',
            ],
          },
          {
            label: 'Social & Emotional Development',
            points: [
              'Talk to your baby about what they see, hear, and perhaps feel — like fear, happiness, cold, or hot.',
              'Name emotions gently, even if they are only beginning to be perceived.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Research in affective neuroscience highlights that naming experiences supports emotional regulation later in life.',
      },
    ],
    closingNote:
      'This weekly structure will continue throughout the app, gradually increasing complexity while always respecting each child\'s unique developmental rhythm.\n\nRemember: development happens in waves, not straight lines. Variation is not only normal — it is expected.',
  },

  // ─── MONTH 4 ───
  {
    month: 4,
    title: 'Month 4',
    subtitle: 'Discovery and strengthening connections',
    weeks: [
      {
        week: 1,
        title: 'Rolling Foundations and Core Strength',
        gentleFocus: 'Floor-based movement and early problem-solving',
        iconName: 'move',
        introduction:
          'Around this stage, many babies begin attempting to roll from tummy to back.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Increase supervised tummy time.',
              'Place a toy slightly to the side to encourage weight shifting.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'Allow your baby to reach, miss, and try again.',
              'Avoid placing objects directly into their hands every time.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Repeated floor-based movement strengthens the deep trunk muscles necessary for later sitting and crawling. Trial-and-error supports early problem-solving circuits.',
        weeklyCta:
          'This week, create a safe floor space and allow at least two short daily sessions of free movement exploration.',
        extraGuidance: {
          title: 'Environmental Care',
          points: [
            'Choose organic cotton clothing rather than synthetic fabrics when possible. Natural fibres reduce skin irritation and limit exposure to microplastics.',
            'Wash new clothes before first use using gentle, fragrance-free detergents.',
          ],
        },
      },
      {
        week: 2,
        title: 'Laughter, Voice, and Social Brain Activation',
        gentleFocus: 'Turn-taking, vocal exchange, and undivided attention',
        iconName: 'smile',
        introduction:
          'Your baby may now laugh aloud and actively seek interaction.',
        sections: [
          {
            label: 'Social & Emotional Development',
            points: [
              'Play turn-taking games (you smile, pause, baby responds).',
              "Imitate your baby's sounds.",
            ],
          },
        ],
        neurodevelopmentalNote:
          "Studies in social neuroscience (e.g. Trevarthen's work on \"proto-conversation\") show that back-and-forth vocal exchanges strengthen early communication networks.",
        weeklyCta:
          'Schedule five to ten minutes of uninterrupted face-to-face play daily — no phones, no distractions, no screens.',
      },
      {
        week: 3,
        title: 'Visual Tracking and Hand Coordination',
        gentleFocus: 'Cross-body movement and texture exploration',
        iconName: 'hand',
        introduction:
          "Your baby is developing bilateral coordination — using both sides of the body together.",
        sections: [
          {
            label: 'Motor & Visual Integration',
            points: [
              'Encourage reaching across the midline (from one side of the body to the other).',
              'Offer lightweight objects that require two hands.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Cross-body movement supports bilateral integration — coordination between the two brain hemispheres.',
        weeklyCta:
          'Introduce one new safe texture this week — wood, silicone, natural fabric — and observe how your baby explores it.',
      },
      {
        week: 4,
        title: 'Sleep Rhythms and Regulation',
        gentleFocus: 'Circadian rhythms, consistency, and early self-efficacy',
        iconName: 'moon',
        introduction:
          "Circadian rhythms (the body's internal clock) are becoming more established.",
        sections: [
          {
            label: 'Nervous System Development',
            points: [
              'Maintain consistent bedtime cues.',
              'Dim lights at least 30 minutes before sleep.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Infant sleep research indicates that predictable routines help regulate cortisol (a stress hormone) and melatonin production. Short independent play moments support early self-efficacy.',
        weeklyCta:
          'Refine your evening ritual and keep it consistent for seven consecutive nights. Allow 30% of play time for supervised independent exploration daily.',
        extraGuidance: {
          title: 'Maternal Nutrition (If Breastfeeding)',
          points: [
            'Prioritise organic foods where possible to reduce exposure to pesticides.',
            'Choose whole, minimally processed meals.',
            'Some families prefer to reduce gluten intake to support sensitivity; always consult your health professional for more significant dietary changes.',
          ],
        },
      },
    ],
  },

  // ─── MONTH 5 ───
  {
    month: 5,
    title: 'Month 5',
    subtitle: 'Stability, curiosity, and early communication',
    weeks: [
      {
        week: 1,
        title: 'Supported Sitting and Trunk Control',
        gentleFocus: 'Floor-based practice and reducing restrictive devices',
        iconName: 'move',
        introduction:
          'Many babies begin practising supported sitting around this stage.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Sit your baby on the floor between your legs for support.',
              'Avoid prolonged time in restrictive devices.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Floor-based movement remains the gold standard for motor development according to paediatric physiotherapy research.',
        weeklyCta:
          'Replace one container-based activity (bouncer, seat) with supervised floor time.',
      },
      {
        week: 2,
        title: 'Babbling and Sound Play',
        gentleFocus: 'Phonemic mapping and consistent word repetition',
        iconName: 'music',
        introduction:
          'Babbling becomes more varied ("ba", "da", "ma").',
        sections: [
          {
            label: 'Language Development',
            points: [
              "Repeat the sounds your baby makes.",
              'Expand slightly (baby says "ba", you say "ball").',
            ],
          },
        ],
        neurodevelopmentalNote:
          "Repetition strengthens phonemic mapping — the brain's ability to distinguish speech sounds.",
        weeklyCta:
          'Choose three simple words and repeat them consistently throughout daily routines.',
      },
      {
        week: 3,
        title: 'Object Exploration and Early Memory',
        gentleFocus: 'Object permanence and memory building',
        iconName: 'brain',
        introduction:
          'Your baby is beginning to understand that objects continue to exist even when partially hidden — an early form of object permanence.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Partially hide a favourite toy under a cloth and allow your baby to search for it.',
            ],
          },
        ],
        neurodevelopmentalNote:
          "Developmental psychology research (Piaget's early sensorimotor stages) highlights this as a foundation for memory building.",
        weeklyCta: 'Play one short hiding-and-finding game each day.',
      },
      {
        week: 4,
        title: 'Emotional Referencing',
        gentleFocus: 'Social referencing and modelling calm curiosity',
        iconName: 'heart',
        introduction:
          'Your baby now looks to you to understand whether something is safe.',
        sections: [
          {
            label: 'Social Development',
            points: [
              'If a new sound occurs, respond calmly and reassuringly.',
              'Use facial expressions intentionally.',
            ],
          },
        ],
        neurodevelopmentalNote:
          "This is known as social referencing — babies read caregivers' faces to regulate their own emotional responses.",
        weeklyCta:
          'Become aware of your facial expressions during new experiences and model calm curiosity.',
      },
    ],
  },

  // ─── MONTH 6 ───
  {
    month: 6,
    title: 'Month 6',
    subtitle: 'Mobility, solids, and expanding awareness',
    weeks: [
      {
        week: 1,
        title: 'Preparing for Crawling',
        gentleFocus: 'Shoulder stability, spatial awareness, and safe exploration',
        iconName: 'move',
        introduction:
          'Your baby may rock on hands and knees or pivot in circles.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Encourage reaching slightly beyond comfortable distance.',
              'Continue daily tummy time.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Crawling preparation strengthens shoulder stability and spatial awareness.',
        weeklyCta:
          'Create a safe exploration zone on the floor free from hazards.',
      },
      {
        week: 2,
        title: 'Introduction to Solid Foods',
        gentleFocus: 'Developmental readiness, organic ingredients, and patient observation',
        iconName: 'sun',
        introduction:
          'Signs of readiness may include sitting with support and showing interest in food.',
        sections: [
          {
            label: 'Feeding Guidance',
            points: [
              'Introduce single-organic ingredient foods gradually.',
              'Observe for tolerance and comfort.',
              "We recommend exclusive breastfeeding for around six months or longer, while also encouraging you to listen to your body and your baby's needs. After this period, you can begin introducing complementary foods gradually, while continuing milk feeds for as long as it feels right for both of you.",
            ],
          },
        ],
        neurodevelopmentalNote:
          'Gradual, responsive introduction to solids supports both nutritional needs and the developing sensory system.',
        weeklyCta:
          "Introduce one new whole food and observe your baby's response calmly and patiently.",
        extraGuidance: {
          title: 'Food Quality',
          points: [
            'Prefer organic farmers when possible to reduce pesticide exposure.',
            'Avoid highly processed foods.',
            'Introduce natural flavours without added sugar or salt.',
          ],
        },
      },
      {
        week: 3,
        title: 'Fine Motor Precision',
        gentleFocus: 'Grasp refinement and hand-to-hand transfer',
        iconName: 'hand',
        introduction:
          'Your baby begins refining grasp patterns.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Offer safe finger foods (if ready) or graspable objects.',
              'Encourage transferring objects between hands.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'This supports the development of the pincer grasp (thumb-to-finger coordination), essential for later writing skills.',
        weeklyCta:
          'Allow supervised self-feeding exploration at least once per day if appropriate.',
      },
      {
        week: 4,
        title: 'Social Expansion and Emotional Labelling',
        gentleFocus: 'Naming emotions and calm reassurance during new interactions',
        iconName: 'heart',
        introduction:
          'Your baby is increasingly aware of social differences between familiar and unfamiliar people.',
        sections: [
          {
            label: 'Cognitive & Emotional Development',
            points: [
              'Name emotions gently ("You look surprised", "That was loud", "It\'s normal to feel like this").',
              'Maintain consistent, calm reassurance during new interactions.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Affective neuroscience research suggests that early emotional labelling supports long-term emotional regulation.',
        weeklyCta:
          'This week, consciously name at least one emotional state during daily interactions.',
      },
    ],
    closingNote:
      "As your baby grows, this content will continue to expand month by month, always respecting each child's individual rhythm and neurodevelopmental uniqueness.",
  },

  // ─── MONTH 7 ───
  {
    month: 7,
    title: 'Month 7',
    subtitle: 'Movement with intention',
    weeks: [
      {
        week: 1,
        title: 'Independent Sitting Stability',
        gentleFocus: 'Building postural control through seated exploration',
        iconName: 'move',
        introduction:
          "Fine motor coordination is improving in the 7-month-old baby: some can already hold an object with their little hands, they probably pass things from one hand to the other easily and may even be able to hold a special children's cup with both hands together (and with your help).\n\nIt is at this stage that many children begin to test the authority of their parents.",
        sections: [
          {
            label: 'Motor Development',
            points: [
              'At this stage, the baby can support weight on their legs for short periods and loves to jump.',
              'Follow the instructions in the e-book developed by the physiotherapist and sent by email.',
              'Many babies can now sit independently for short periods.',
              'Encourage reaching while seated.',
              'Place toys slightly outside immediate reach to stimulate balance adjustments.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'In this cycle, the baby is already able to spell two-syllable words, repeating the initial syllable: mama, da-da, etc.',
              'Then, they will start using expressions like "ai" or "ui" and soon will be able to intentionally shout to get attention.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'This strengthens "postural control" — the nervous system\'s ability to maintain body alignment against gravity. Research in paediatric motor control shows that dynamic sitting improves trunk activation patterns necessary for crawling.',
        weeklyCta:
          'Create one safe sitting exploration session daily where your baby can freely reach and rebalance.',
      },
      {
        week: 2,
        title: 'Early Crawling Attempts',
        gentleFocus: 'Supporting cross-lateral integration through floor-based play',
        iconName: 'move',
        introduction:
          'Your baby may begin rocking on hands and knees or moving backwards. This is an exciting stage of motor and brain integration.',
        sections: [
          {
            label: 'Motor & Brain Integration',
            points: [
              'Your baby may begin rocking on hands and knees or moving backwards.',
              'Crawling stimulates "cross-lateral integration" — communication between left and right brain hemispheres via the corpus callosum.',
            ],
          },
          {
            label: 'Cognitive and Motor Development',
            points: [
              'Activity: Grouping blocks — The baby is beginning to understand the relationship of one object to another in a three-dimensional space.',
              'With this skill, they begin to observe the toys and are able to group blocks by size.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Studies in developmental neuroscience associate crawling with later spatial awareness and reading readiness.',
        weeklyCta:
          'Increase floor-based play throughout the day.',
      },
      {
        week: 3,
        title: 'Advanced Babbling',
        gentleFocus: 'Encouraging rhythmic vocal play and persistence',
        iconName: 'message-circle',
        introduction:
          'Babbling becomes more complex and rhythmic. This stage reflects "canonical babbling" — repeated consonant-vowel combinations (e.g., "bababa"). Research shows this predicts later expressive language development.',
        sections: [
          {
            label: 'Language Development',
            points: [
              'Repeat and expand sounds your baby makes.',
              'Maintain eye contact during vocal play.',
            ],
          },
          {
            label: 'Motor Development',
            points: [
              'To help with the development of fine motor coordination, place a toy that the baby likes the most or something interesting out of reach and observe how they try to grab it.',
              'If they can\'t reach it, they may cry, but perseverance and frustration go hand in hand — calmly encourage them without handing over the object.',
              'After a few attempts, the baby will lean over and then return to the initial position, building physical confidence.',
            ],
          },
          {
            label: 'Cognitive Development',
            points: [
              'Continue using the list of primary words and the conscious repetition of some expressions to increase the quality of linguistic perception.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Canonical babbling is a key milestone in speech development. Responsive vocal interaction strengthens the neural pathways that support future language.',
        weeklyCta:
          'Have one uninterrupted "conversation" daily where you respond to every vocal attempt.',
      },
      {
        week: 4,
        title: 'Stranger Awareness',
        gentleFocus: 'Calm reassurance during new social experiences',
        iconName: 'heart',
        introduction:
          'Your baby may show hesitation around unfamiliar people. This reflects maturation of the "amygdala" — the brain region involved in threat detection — and attachment circuitry.',
        sections: [
          {
            label: 'Emotional Development',
            points: [
              'Offer reassurance without forcing interaction.',
              'Stay physically present during new experiences.',
              'Model calm reassurance when introducing new people.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Stranger awareness is a healthy sign of attachment and cognitive development. The amygdala is maturing, helping your baby distinguish between familiar and unfamiliar faces.',
        weeklyCta:
          'Model calm reassurance when introducing new people this week.',
        extraGuidance: {
          title: 'Extra tips for Month 7',
          points: [
            'At 7 months, the baby is already eating solids; however, be patient if they don\'t eat as much as you expect or everything you offer.',
            'The baby should sleep, on average, 14 hours a day. Normally, they also divide this sleep between nighttime sleep and two daytime naps.',
            'It\'s important to remember that the learning rhythm is not continuous, proceeding through leaps and setbacks — this is due to synaptic pruning or lack of consolidation of learning. Forgetting previous acquisitions is considered normal.',
          ],
        },
      },
    ],
    closingNote:
      'Month 7 brings wonderful movement milestones. Every baby finds their own rhythm — trust the process and enjoy the adventure together.',
  },

  // ─── MONTH 8 ───
  {
    month: 8,
    title: 'Month 8',
    subtitle: 'Exploration and cause–effect learning',
    weeks: [
      {
        week: 1,
        title: 'Intentional Movement',
        gentleFocus: 'Safe exploration and early memory development',
        iconName: 'move',
        introduction:
          "A new world of adventures is about to open up for your baby, so now, more than ever, it's time to make sure your home is a safe environment. Babies as young as 8 months old can already crawl.\n\nIt's important that you make sure that fragile objects and furniture that could put the child at risk are positioned out of their reach and radar.",
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'They already know that an object exists even when they don\'t see it, and when they see an object disappear, they look for it.',
              'Memory begins to show its signs of development, and memory is the most interesting ability developing right now.',
            ],
          },
          {
            label: 'Suggested Activity',
            points: [
              'Play games focused on hiding and finding — for example, put their favourite toy behind your back and ask "where is it?"',
              'Make variations of this memory-focused game throughout the week.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Object permanence is becoming well established. The ability to hold an image in mind when the object is out of sight reflects important memory and prefrontal cortex development.',
        weeklyCta:
          'Play one hiding-and-finding game each day to support memory development.',
      },
      {
        week: 2,
        title: 'Object Permanence Expands',
        gentleFocus: 'Supporting independence and managing separation feelings',
        iconName: 'brain',
        introduction:
          'Your baby is becoming more physically capable and emotionally expressive. This is a wonderful — and sometimes challenging — time for both of you.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              '8-month-old babies can already: stand up by supporting themselves on objects, pick up toys when they fall on the floor, and open cupboards and drawers to get what\'s inside.',
              'Proposal: Leave an object at a distance of 1 metre and ask the baby to fetch it.',
              'Suggestion: Assemble a sensory bottle to diversify the stimuli — take an empty water bottle, put grains in it, cap it, and give it to the baby; they will love it.',
            ],
          },
          {
            label: 'Emotional & Affective Development',
            points: [
              'An 8-month-old baby is quite emotional, misses their parents, doesn\'t like being alone and always seeks to be held by someone.',
              'At this stage, separation anxiety can be very strong, so they want to stay closer.',
              'When you need to go out and leave your baby with someone they know — whether it\'s their father, caregiver or grandparents — talk to the baby and say you\'ll be back soon. If they start to cry, gently reassure them and go.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Separation anxiety is a normal and healthy part of attachment development. It shows your baby has formed a strong bond and is beginning to understand that you are a separate person.',
        weeklyCta:
          'Create one sensory exploration activity this week using safe household items.',
      },
      {
        week: 3,
        title: 'Fine Motor Precision',
        gentleFocus: 'Exploring textures, shapes, and early vocabulary',
        iconName: 'hand',
        introduction:
          'Your baby\'s fine motor skills are developing rapidly, and their understanding of language is growing alongside.',
        sections: [
          {
            label: 'Cognitive Development',
            points: [
              'Perceives the meaning of some words, and repeats vowels and sounds forming "pa pa" and "ma ma".',
              'Continue using the list of primary words from the primer to expand this vocabulary.',
              'Imitate animal sounds, car engines, etc. — they will love it.',
            ],
          },
          {
            label: 'Sensory & Motor Development',
            points: [
              'Treasure Box: Take a box, put all the small toys that your baby is fond of and a couple of new textures like a small food package, and place them inside.',
              'The treasure box allows them to get to know new objects that are part of the familiar environment. Through touch, they recognise new shapes and textures.',
              'Put a label on these toys with their respective names, and when the baby takes out the toy, read its name to them.',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Pairing tactile exploration with naming supports multi-sensory learning — connecting touch, vision, and language pathways in the developing brain.',
        weeklyCta:
          'Create a treasure box this week and explore it together, naming each item.',
      },
      {
        week: 4,
        title: 'Balance and Sensory Play',
        gentleFocus: 'Stimulating balance and multi-sensory curiosity',
        iconName: 'sparkles',
        introduction:
          'This week focuses on balance development and rich sensory experiences that spark curiosity and joy.',
        sections: [
          {
            label: 'Motor Development',
            points: [
              'Look for games that stimulate the sense of balance.',
              'Continue encouraging the baby to reach for objects — on a safe surface, place toys away from them so that they try to reach them.',
            ],
          },
          {
            label: 'Sensory & Motor Development',
            points: [
              'Place raw foods such as beans, rice, and pasta inside a box for sensory exploration.',
              'Variation: Inside a tray or small container, place liquid foods, gelatin, ice in a bag or protected by cling film, flour — use your creativity and let your baby\'s curiosity run the game. Give them time alone to experiment the first time.',
              'The second time you make this activity, name the processes and tell them the name of each thing, such as "look at this baby, a soft, purple gelatin."',
              'Brush flour or gelatin on their face — have fun together!',
            ],
          },
        ],
        neurodevelopmentalNote:
          'Multi-sensory play strengthens neural connections across the brain. When babies explore different textures, temperatures, and consistencies, they build a richer understanding of the physical world.',
        weeklyCta:
          'Set up one sensory tray experience this week and let your baby explore freely.',
      },
    ],
    closingNote:
      'Month 8 is a time of wonderful exploration. Your baby is becoming more intentional in their movements and increasingly curious about the world. Continue to provide a safe, stimulating environment and enjoy this beautiful stage together.',
  },
];
