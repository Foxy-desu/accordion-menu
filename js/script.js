(function() {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 0,
  };

  /* Код компонента пишите ниже */
  function accordionHandler() {
    const tabsLimit = settings.tabsLimit;
    const accordeon = document.querySelector('.accordeon');
    let openTabs = [];

    function getTab(e) {
      const tab = e.target.closest('.accordeon-item-title');
      return tab;
    }

    function toggleTab(tab) {
      const modifier = 'accordeon-item--open';
      const accordeonItem = tab.closest('.accordeon-item');

      accordeonItem.classList.toggle(modifier);
    }

    function addOpenTab(tab) {
      openTabs.push(tab);
    }

    function removeopenTab() {
      return openTabs.shift();
    }

    function removeCurrentTab(tab) {
      openTabs = openTabs.filter((openTab) => openTab !== tab);
    }

    function manageOpenTabs(tab) {
      if(openTabs.includes(tab)) {
        removeCurrentTab(tab);
        toggleTab(tab);
      } else {
        if(openTabs.length < tabsLimit || tabsLimit === 0) {
          addOpenTab(tab);
          toggleTab(tab);
        } else {
          toggleTab(removeopenTab());
          toggleTab(tab);
          addOpenTab(tab);
        }
      }
    }

    accordeon.addEventListener('click', (e)=> {
      const tab = getTab(e);
      manageOpenTabs(tab);
    });

  }
  accordionHandler();

})();
