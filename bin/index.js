#!/usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';
import { input, select } from '@inquirer/prompts';
import figlet from 'figlet';

//shorten console.log
const log = string => {
  console.log(string);
};

let playerName;

const sleep = (s = 2) => new Promise(r => setTimeout(r, s * 1000)); // takes seconds as argument

async function takeName() {
  playerName = await input({
    message: chalk.black('what is your name?: '),
  });
  console.clear();
}

async function welcome() {
  const welcome = chalkAnimation.rainbow('Welcome to THE Game');

  await sleep();

  welcome.stop();

  log(chalk.blue('   Quiz 001: Heaven and Earth'));
  log('');
  log(`   so ${playerName}, ${chalk.bgBlack.dim.gray('listen')}`);
  log('   if you get it right you will transcend,');
  log('   but if i get it wrong, you ask?');
  await sleep();
  const glitchMessage = chalkAnimation.glitch(
    '   your existence gets obliterated'
  );
  await sleep(2);
  glitchMessage.stop();
  console.clear();
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('checking answer...').start();

  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over` });
    return 'death';
  }
}

async function question1() {
  const answer = await select({
    message: 'who is the GOAT',
    choices: [
      {
        name: 'messi',
        value: 'messi',
        description: 'messi is magical',
      },
      {
        name: 'ronaldo',
        value: 'ronaldo',
        description: 'ronaldo is phenomenon',
      },
      {
        name: 'cristiano',
        value: 'cristiano',
        disabled: true,
      },
      {
        name: 'Pele',
        value: 'Pele',
        disabled: "(he's not available (dead lmao))",
      },
    ],
  });
  console.log(answer);
  return handleAnswer(answer == 'messi');
}

function winner() {
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.rainbow.multiline(data) + '\n');
  });
}

async function playGame() {
  await takeName();
  await welcome();
  const result = await question1();
  if (result == 'death') {
    const lost = chalkAnimation.glitch(`   you lose ${playerName}!`);
    await sleep(4);
    lost.stop();
    console.clear();
    return;
  }
  winner();
}

playGame();
