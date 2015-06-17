Selecting a connector from the left populates the configuration lines as well as
fields on the right. When 'Save' is clicked, the associated configurations are
save to DB for the selected connector.

New code was split into separate files delineating their components, and wrapped inf IFFE's
to ensure new code did not polute the global namespace in the project.

Todo:
  - Make new connector button functional
  - Unit tests for new code
  - User notification of data save
