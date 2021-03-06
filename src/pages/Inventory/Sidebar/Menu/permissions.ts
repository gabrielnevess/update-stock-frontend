export const ROLE_CADASTRAR_MARCA: string = "ROLE_CADASTRAR_MARCA";
export const ROLE_REMOVER_MARCA: string = "ROLE_REMOVER_MARCA";
export const ROLE_PESQUISAR_MARCA: string = "ROLE_PESQUISAR_MARCA";

export const ROLE_CADASTRAR_UNIDADE_MEDIDA: string = "ROLE_CADASTRAR_UNIDADE_MEDIDA";
export const ROLE_REMOVER_UNIDADE_MEDIDA: string = "ROLE_REMOVER_UNIDADE_MEDIDA";
export const ROLE_PESQUISAR_UNIDADE_MEDIDA: string = "ROLE_PESQUISAR_UNIDADE_MEDIDA";

export const ROLE_CADASTRAR_PRODUTO: string = "ROLE_CADASTRAR_PRODUTO";
export const ROLE_REMOVER_PRODUTO: string = "ROLE_REMOVER_PRODUTO";
export const ROLE_PESQUISAR_PRODUTO: string = "ROLE_PESQUISAR_PRODUTO";

export const ROLE_REMOVER_ESTOQUE: string = "ROLE_REMOVER_ESTOQUE";
export const ROLE_PESQUISAR_ESTOQUE: string = "ROLE_PESQUISAR_ESTOQUE";

export const ROLE_CADASTRAR_ENTRADA_PRODUTO: string = "ROLE_CADASTRAR_ENTRADA_PRODUTO";
export const ROLE_REMOVER_ENTRADA_PRODUTO: string = "ROLE_REMOVER_ENTRADA_PRODUTO";
export const ROLE_PESQUISAR_ENTRADA_PRODUTO: string = "ROLE_PESQUISAR_ENTRADA_PRODUTO";

export const ROLE_CADASTRAR_SAIDA_PRODUTO: string = "ROLE_CADASTRAR_SAIDA_PRODUTO";
export const ROLE_REMOVER_SAIDA_PRODUTO: string = "ROLE_REMOVER_SAIDA_PRODUTO";
export const ROLE_PESQUISAR_SAIDA_PRODUTO: string = "ROLE_PESQUISAR_SAIDA_PRODUTO";

export const ROLE_CADASTRAR_USUARIO: string = "ROLE_CADASTRAR_USUARIO";
export const ROLE_REMOVER_USUARIO: string = "ROLE_REMOVER_USUARIO";
export const ROLE_PESQUISAR_USUARIO: string = "ROLE_PESQUISAR_USUARIO";

export const ROLE_CADASTRAR_PERMISSAO: string = "ROLE_CADASTRAR_PERMISSAO";
export const ROLE_REMOVER_PERMISSAO: string = "ROLE_REMOVER_PERMISSAO";
export const ROLE_PESQUISAR_PERMISSAO: string = "ROLE_PESQUISAR_PERMISSAO";

export const ROLE_CADASTRAR_USUARIO_PERMISSAO: string = "ROLE_CADASTRAR_USUARIO_PERMISSAO";
export const ROLE_REMOVER_USUARIO_PERMISSAO: string = "ROLE_REMOVER_USUARIO_PERMISSAO";
export const ROLE_PESQUISAR_USUARIO_PERMISSAO: string = "ROLE_PESQUISAR_USUARIO_PERMISSAO";

export const isPermissionValid = (permissions: string[], value: string): boolean => permissions.includes(value);