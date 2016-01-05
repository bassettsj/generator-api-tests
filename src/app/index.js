import yeoman from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

export default yeoman.generators.Base.extend({
  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-api-tests') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      'default': true,
    }];

    this.prompt(prompts, (props) => {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    });
  },

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install() {
    this.installDependencies();
  },
});
