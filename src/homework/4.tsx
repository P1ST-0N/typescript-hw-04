// Ви вирішили застосувати до меню контекст і тепер вам потрібно його типізувати.

// Описати тип SelectedMenu: Це має бути об'єкт, який містить id з типом MenuIds

// Описати тип MenuSelected: Цей тип є об'єктом, що містить selectedMenu

// Описати тип MenuAction: Цей тип являє собою об'єкт з методом onSelectedMenu, який приймає об'єкт типу SelectedMenu як аргумент повертає void.

// Описати тип PropsProvider: Опишіть правильний тип для дітей

// Описати тип PropsMenu: Опишіть тип для menus, він має бути від типу Menu

import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  ReactNode,
} from "react";
import noop from "lodash/noop";

// Визначте тип MenuIds
type MenuIds = "first" | "second" | "last";

// Визначте тип Menu
type Menu = {
  id: MenuIds;
  title: string;
};

// Визначте тип SelectedMenu
type SelectedMenu = {
  id: MenuIds;
};

// Визначте тип MenuSelected
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

// Визначте тип MenuAction
type MenuAction = {
  onSelectedMenu: (selectedMenu: SelectedMenu) => void;
};

// Створіть контекст для вибраного меню
const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: { id: "first" }, // Початкове значення може бути будь-яким
});

// Створіть контекст для дій з меню
const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

// Визначте тип PropsProvider
type PropsProvider = {
  children: ReactNode;
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>(
    {} as SelectedMenu
  );

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus: Menu[]; // Додайте вірний тип для меню
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
